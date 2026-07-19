# Campus Guide — Retention Strategy

## North Star
- **20k first-month installs** (freshers, referral links before school starts)
- **50%+ DAU** after first month — every user opens 1–3 days minimum

## Why They Open
1. **Data bundles** (strongest pillar — real need, repeat purchase)
2. **Timetable** (daily utility)
3. **Formula solver** (academic tool, heavy usage)
4. **Whispers** (social dopamine — some users)
5. **Thrift** (transactional — some users)
6. **Lost & Found** (occasional)

## Constraints (PWA-only)
- No home screen widgets (Android experimental only, none on iOS)
- No reliable periodic background sync
- localStorage only — no server (for now)
- No native code

## What Already Exists
- Push notifications (daily digest + event-based)
- In-app dashboard widgets (timetable, weather, next class)
- Focus timer
- Badging API (notification badge on icon)

## What Moves DAU with Zero Infrastructure
1. **Targeted push via timetable** — "Your 8am CALC lecture starts in 30min"
2. **Thrift saved search + push** — user saves query, push fires on new match
3. **Study streak → data reward** — Focus timer hours unlock bundle discount
4. **Daily dynamic content on home tab** — tip of the day, thought, random fact
5. **Campus Cup** — weekly leaderboard (whispers, thrift, usage), top prizes via data

## Non-Goals
- Server-side auth / cloud sync (until validated)
- Native widgets
- Login streaks in localStorage (abuse-prone)

## How We Win
-> The app must be useful enough that habit forms naturally.
-> Data is the hook. Timetable is the daily anchor.
-> Push is the reminder when habit slips.
