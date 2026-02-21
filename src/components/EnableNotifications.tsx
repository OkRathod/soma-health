"use client";

import { useState, useEffect } from 'react';
import { Bell, BellRing, BellOff, Loader2 } from 'lucide-react'; // 👈 Added BellOff
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

            // 👇 Make sure this path matches exactly where your route.ts is located
            const res = await fetch('/api/cron/notifications/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscription)
            });

            if (res.ok) {
                setIsSubscribed(true);
                toast.success("Reminders enabled successfully! 🎉");
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

    // 👇 NEW: Function to handle turning off notifications
    async function handleUnsubscribe() {
        setIsLoading(true);
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                // 1. Tell the browser to stop listening for pushes
                await subscription.unsubscribe();

                // 2. Tell the database to delete this device
                // 👇 Make sure this path matches exactly where your route.ts is located
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
            <div className="p-4 bg-secondary/30 rounded-xl border border-border/50 text-sm text-muted-foreground flex items-center gap-3">
                <Bell className="w-5 h-5 opacity-50" />
                <p>Push notifications are not supported or are blocked in this browser.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-card border border-border/60 rounded-2xl shadow-sm">
            <div className="space-y-1">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" /> Task Reminders
                </h4>
                <p className="text-sm text-muted-foreground">
                    Get pinged 5 mins before a task starts, and every 6 hours for un-timed habits.
                </p>
            </div>
            
            {/* 👇 UPDATED: Button now toggles between subscribe and unsubscribe */}
            <Button 
                onClick={isSubscribed ? handleUnsubscribe : handleSubscribe} 
                disabled={isLoading}
                variant={isSubscribed ? "outline" : "default"}
                className={`gap-2 shrink-0 transition-all ${isSubscribed ? 'text-destructive hover:bg-destructive/10 border-destructive/20 hover:text-destructive' : 'shadow-md'}`}
            >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                 isSubscribed ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                
                {isSubscribed ? "Turn off Reminders" : "Turn on Reminders"}
            </Button>
        </div>
    );
}