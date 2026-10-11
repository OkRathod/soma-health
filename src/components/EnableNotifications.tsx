"use client";

import { useState, useEffect } from 'react';
import { Bell, BellOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function EnableNotifications() {
    const [isSupported, setIsSupported] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
            navigator.serviceWorker.register('/sw.js').then(reg => {
                reg.pushManager.getSubscription().then(sub => {
                    if (sub) setIsSubscribed(true);
                });
            });
        }
    }, []);

    async function handleSubscribe() {
        setIsLoading(true);
        try {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                toast.error("Notification permission denied. Please enable in site settings.");
                setIsLoading(false);
                return;
            }

            const registration = await navigator.serviceWorker.ready;
            const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
            if (!vapidPublicKey) throw new Error("Missing VAPID key");
            
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            });

            // This path must match where the subscribe route.ts lives
            const res = await fetch('/api/cron/notifications/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscription)
            });

            if (res.ok) {
                setIsSubscribed(true);
                toast.success("Reminders enabled successfully!");
            } else {
                toast.error("Failed to connect device to server.");
            }
        } catch (error) {
            console.error("Subscription process failed:", error);
            toast.error("An error occurred while setting up notifications.");
        } finally {
            setIsLoading(false);
        }
    }

    // Turns notifications off for this device
    async function handleUnsubscribe() {
        setIsLoading(true);
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                // 1. Tell the browser to stop listening for pushes
                await subscription.unsubscribe();

                // 2. Tell the database to delete this device
                // This path must match where the subscribe route.ts lives
                await fetch('/api/cron/notifications/subscribe', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ endpoint: subscription.endpoint })
                });
            }

            setIsSubscribed(false);
            toast.success("Reminders disabled.");
        } catch (error) {
            console.error("Unsubscribe failed:", error);
            toast.error("Failed to disable notifications.");
        } finally {
            setIsLoading(false);
        }
    }

    if (!isSupported) {
        return (
            <div className="flex items-center gap-3 rounded-3xl bg-surface p-5 text-sm text-muted-foreground">
                <BellOff className="size-5 shrink-0" />
                <p>Push notifications are not supported or are blocked in this browser.</p>
            </div>
        );
    }

    return (
        <div className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
            <div className="flex min-w-0 items-start gap-4">
                <span
                    className={`grid size-11 shrink-0 place-items-center rounded-full ${
                        isSubscribed ? 'bg-lime text-lime-foreground' : 'bg-surface text-muted-foreground'
                    }`}
                >
                    <Bell className="size-5" />
                </span>
                <div className="min-w-0">
                    <h4 className="flex flex-wrap items-center gap-2 text-[15px] font-medium">
                        Task reminders
                        <span className="label-mono">{isSubscribed ? 'On for this device' : 'Off'}</span>
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Get pinged 5 mins before a task starts, and every 6 hours for un-timed habits.
                    </p>
                </div>
            </div>

            <Button
                onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
                disabled={isLoading}
                variant={isSubscribed ? "outline" : "default"}
                className={`w-full shrink-0 sm:w-auto ${
                    isSubscribed ? 'text-destructive hover:border-destructive/40 hover:bg-priority-high-bg hover:text-destructive' : ''
                }`}
            >
                {isLoading ? <Loader2 className="size-4 animate-spin" /> :
                 isSubscribed ? <BellOff /> : <Bell />}

                {isSubscribed ? "Turn off reminders" : "Turn on reminders"}
            </Button>
        </div>
    );
}
