export const guides = [
    {
    slug: "the-soma-protocol", // This matches the folder name we just made
    title: "The Soma Protocol", 
    description: "The official master guide to high-performance living with Soma.",
    date: "2025-12-14",
    readTime: "Interactive Guide",
    // Content here is ignored because the page.tsx file overrides it
    content: "" 
  },
  // {
  //   slug: "the-soma-protocol-guide", // 👈 This determines the URL: soma.com/guides/the-soma-protocol
  //   title: "The Soma Protocol: A Master Guide to Peak Performance",
  //   description: "A blueprint for high-performance living. Learn how to optimize your day using biology, psychology, and the Soma workflow.",
  //   date: "2025-12-14",
  //   readTime: "12 min read",
  //   content: `
  //     <h2>Phase 0: The Setup (Do This Once)</h2>
  //     <p>To make Soma an extension of your brain, friction must be zero. The goal is to reduce the "activation energy" required to track your life.</p>
      
  //     <h3>1. Install as a PWA</h3>
  //     <p><strong>Mobile:</strong> Open Soma in Safari (iOS) or Chrome (Android) → Tap Share/Menu → <strong>"Add to Home Screen"</strong>.</p>
  //     <p><strong>Desktop:</strong> Open in Chrome → Click the Install icon in the address bar.</p>
  //     <p><em>Why:</em> This removes the browser UI, giving you a full-screen, app-like experience. You are one tap away from logging.</p>

  //     <h3>2. The "Quick Log" Mindset</h3>
  //     <p>Train yourself to treat the Dashboard as your homepage. It is designed for speed. Don't navigate menus; just log.</p>

  //     <hr />

  //     <h2>Phase 1: The Night Before (Design Your Day)</h2>
  //     <p>Optimization starts the night before. Decision fatigue is the enemy of productivity. If you wake up asking "What should I do?", you have already lost energy.</p>

  //     <h3>Step 1: The Timeline Construction</h3>
  //     <p>Go to the <strong>Tasks Page</strong>. Switch to "Time" View.</p>
  //     <ol>
  //       <li><strong>Block the Non-Negotiables First (Habits):</strong> Create tasks for Sleep, Gym, and Meals. Set their Priority to <strong>HABIT</strong>. These are the anchors of your biological rhythm.</li>
  //       <li><strong>Deep Work Blocks (High Priority):</strong> Add your single most important work task. Drag it to your peak energy time (usually 9:00 AM - 11:00 AM). <em>Pro Tip: Use the Duration field to block 90 minutes.</em></li>
  //       <li><strong>The Shallow Buffer:</strong> Fill gaps with LOW priority tasks like emails or commuting.</li>
  //     </ol>
  //     <blockquote>"The Result: You go to sleep knowing exactly what tomorrow looks like."</blockquote>

  //     <hr />

  //     <h2>Phase 2: Morning Protocol (06:00 - 09:00)</h2>
      
  //     <h3>Step 1: The Mindset Primer</h3>
  //     <p>Open Soma. Read the <strong>Daily Quote</strong> at the top of the Dashboard. <em>Goal:</em> Center your mind before the chaos of the day begins.</p>

  //     <h3>Step 2: Hydration Kickstart</h3>
  //     <p>Before coffee, drink a large glass of water. Tap the <strong>"Add 250ml"</strong> button on the Dashboard immediately.</p>
  //     <p><em>Why:</em> You wake up dehydrated. This single button press starts your "Streak" momentum and wakes up your metabolism.</p>

  //     <h3>Step 3: Log Breakfast (AI Precision)</h3>
  //     <p>Use the Quick Log input. Speak or Type: <em>"3 scrambled eggs, 2 slices of sourdough toast with butter, black coffee."</em></p>
  //     <p><strong>The Magic:</strong> The AI calculates the protein and fats instantly. You don't need to search for ingredients individually.</p>

  //     <hr />

  //     <h2>Phase 3: The Execution Phase (09:00 - 18:00)</h2>

  //     <h3>Step 1: Live by the Timeline</h3>
  //     <p>Keep the Tasks Page open. As you finish a task, click the Checkbox. Watching tasks turn green releases dopamine, encouraging you to tackle the next one.</p>

  //     <h3>Step 2: Adaptive Eating</h3>
  //     <p><strong>Before Lunch:</strong> Glance at your Dashboard Stats.</p>
  //     <ul>
  //       <li><em>Scenario A:</em> If you see you've only eaten 400 calories but burned 200 (Active Energy), you know you need a substantial lunch to prevent an energy crash.</li>
  //       <li><em>Scenario B:</em> If you had a heavy breakfast, the dashboard will visually show you are near your limit. Opt for a salad.</li>
  //     </ul>

  //     <h3>Step 3: Micro-Movements</h3>
  //     <p>Did you walk to get coffee? Did you take the stairs? Log it: <em>"Walked 15 minutes moderate pace."</em></p>
  //     <p><em>Why:</em> Soma subtracts these calories from your "Net Balance," earning you more food allowance for dinner.</p>

  //     <hr />

  //     <h2>Phase 4: Evening Review (20:00 - 22:00)</h2>

  //     <h3>Step 1: Close the Rings</h3>
  //     <p>Look at your <strong>Net Balance</strong> card. Goal: End the day near 0 (Maintenance) or -300 (Weight Loss). Look at the Hydration card. If you are under, drink water now.</p>

  //     <h3>Step 2: The History Audit</h3>
  //     <p>Go to the <strong>History Page</strong>.</p>
  //     <ul>
  //       <li><strong>Click "Timeline":</strong> Compare your planned day with your actual day. Did you miss the gym block? Why?</li>
  //       <li><strong>Click "Diet":</strong> Expand the cards. Read the AI Coach's feedback. Use this info to adjust tomorrow's meals.</li>
  //     </ul>

  //     <hr />

  //     <h2>💡 Advanced Optimization Tips</h2>
      
  //     <h3>1. The "Context" Hack</h3>
  //     <p>The AI is smarter than a calculator. Give it context. Instead of "Burger", type <em>"Double cheeseburger from McDonald's and large fries."</em> The AI will find the exact macros.</p>

  //     <h3>2. Drag & Drop Re-Alignment</h3>
  //     <p>Life happens. If a meeting runs late, go to Tasks and <strong>drag</strong> your "Gym" block from 5:00 PM to 6:00 PM. The timeline automatically reshuffles. You don't feel like you "failed"; you just "rescheduled."</p>

  //     <h3>3. Weekly Pattern Recognition</h3>
  //     <p>On Sundays, look at the <strong>Weekly Chart</strong>. If you consistently miss calorie goals on Thursdays, schedule a "Meal Prep" task for Wednesday nights.</p>

  //     <p><strong>By following this protocol, Soma stops being just a tracker and becomes your Accountability Partner. You aren't just reacting to the day; you are engineering it.</strong></p>
  //   `
  // },
  // Add more guide objects here later!
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}