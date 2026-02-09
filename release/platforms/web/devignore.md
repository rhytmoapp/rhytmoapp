# Rhytmo — Development Plan & Project Design

> Practice Tracking Evolution: From Metronome + Pomodoro to a Full Practice Companion

**Start Date:** February 9, 2026  
**Working Pace:** 4 productive hours/day (solo developer)  
**Estimated Completion:** Mid-August 2026 (~27 weeks)

---

## Table of Contents

1. [Current State Assessment](#1-current-state-assessment)
2. [Gap Analysis: What Exists vs. What's Needed](#2-gap-analysis)
3. [Architecture Evolution Strategy](#3-architecture-evolution-strategy)
4. [Phase 0: Foundation & MVP Hardening](#4-phase-0-foundation--mvp-hardening)
5. [Phase 1: Basic Practice Tracking](#5-phase-1-basic-practice-tracking)
6. [Phase 2: Smart Progression & Motivation](#6-phase-2-smart-progression--motivation)
7. [Phase 3: Refinement & Engagement](#7-phase-3-refinement--engagement)
8. [Future Scope: Teacher-Student Layer](#8-future-scope-teacher-student-layer)
9. [New Dependencies](#9-new-dependencies)
10. [File Structure Evolution](#10-file-structure-evolution)
11. [Data Model Evolution](#11-data-model-evolution)
12. [Timeline & Gantt](#12-timeline--gantt)
13. [Gamification Design Notes](#13-gamification-design-notes)
14. [Risk & Mitigation](#14-risk--mitigation)

---

## 1. Current State Assessment

### What Already Exists (v1.3.0)

| Feature | Status | Maturity |
|---|---|---|
| Metronome (BPM, time signatures, volume, audio) | Implemented | Solid — native audio, responsive layout |
| Practice Timer (Pomodoro) | Implemented | Solid — configurable cycles, chime, session saving |
| History | Implemented | Basic — time filters, stats, session cards |
| Learning Paths | Implemented | Basic — goals, check-in, activity calendar, auto-tracking |
| Onboarding | Implemented | Solid — experience mode selection |
| Settings | Implemented | Minimal — mode reconfig, credits |
| Localization (EN/PT) | Implemented | Solid — 650+ strings |
| Responsive Design | Implemented | Solid — mobile/desktop breakpoints |

### Known Gaps in Current Implementation

| Gap | Impact | Phase to Fix |
|---|---|---|
| Pomodoro settings not persisted | Settings lost on restart | Phase 0 |
| Metronome BPM not persisted | Always resets to 120 BPM | Phase 0 |
| History delete has no confirmation | Accidental data loss | Phase 0 |
| `'metronome'` activity source not implemented | Dead code path | Phase 1 |
| No tap tempo | Missing essential metronome feature | Phase 0 |
| No subdivisions | Limited rhythm options | Phase 0 |
| No sound selection | Only one click sound | Phase 0 |
| No authentication/user setup | Needed for future features | Phase 0 |

---

## 2. Gap Analysis

### Metronome: Current vs. Target

```
CURRENT                          TARGET (Phase 0 + 1)
---------                        ---------------------
BPM: 60-360 slider/buttons       + Tap Tempo
Time Sig: 2/4, 3/4, 4/4, 6/4    + More signatures (5/4, 7/8, etc.)
Volume: 0-100                    (keep)
Sounds: click + accent           + Sound Selection (multiple click packs)
Visual: beat circles              + Visual Metronome (pendulum/flash)
                                  + Subdivisions (quarters, 8ths, 16ths, triplets)
                                  + Accent on Beat 1 (configurable)
                                  ──── Phase 1 ────
                                  + Polyrhythm (3 over 4, etc.)
                                  + Subdivision Mute
                                  + Random Mute (practice tool)
                                  + Custom Accent patterns
```

### Practice Timer: Current vs. Target

```
CURRENT                          TARGET (Phase 0)
---------                        ---------------------
Pomodoro cycles                  + Pre-set Timers (5/10/15/custom)
Work/Break/Long Break            + Count-up mode
Chime on completion              + Auto-stop option
Settings (in-memory)             + Persist settings to storage
```

### Exercise System: NEW (Phase 1)

```
Not yet implemented.
Requires: new feature module, provider, storage service, screens/widgets.
```

### Progress/Consistency Tracking: Current vs. Target

```
CURRENT                           TARGET (Phase 1 + 2)
---------                         ---------------------
History: session list + stats     + Exercise-level BPM tracking
Learning Paths: goals + check-in  + Automatic practice date logging
Day Streak (learning paths only)  + Global daily streak
                                  ──── Phase 2 ────
                                  + Monthly Average BPM
                                  + Best Practice Streak
                                  + Consistency Score ("Practice Health")
                                  + Micro/Macro Goals (daily/weekly/monthly)
```

---

## 3. Architecture Evolution Strategy

### Current Architecture

```
lib/
  features/          # Feature screens + widgets
  providers/         # Riverpod state (flat)
  services/          # Storage + audio (flat)
  screens/           # Main navigation
  widgets/           # Shared widgets
  theme/             # Design tokens
  l10n/              # Localization
```

### Evolved Architecture (Phase 2+)

```
lib/
  core/
    models/                    # Shared data models (Exercise, Achievement, etc.)
    services/
      storage_service.dart     # Abstract storage interface
      notification_service.dart # Smart notifications (Phase 2)
      auth_service.dart        # Authentication (Phase 0)
    utils/
      date_utils.dart          # Shared date helpers
      streak_calculator.dart   # Reusable streak logic
  features/
    metronome/                 # (existing, enhanced)
      widgets/
        tap_tempo_button.dart
        subdivision_picker.dart
        sound_selector.dart
        polyrhythm_control.dart
        progressive_tempo_bar.dart
    pomodoro/                  # (existing, enhanced)
      widgets/
        preset_timer_chips.dart
        count_mode_toggle.dart
    history/                   # (existing, enhanced)
      widgets/
        bpm_chart.dart
        time_chart.dart
        technique_balance_chart.dart
    learning_paths/            # (existing, enhanced)
    exercises/                 # NEW (Phase 1)
      exercise_screen.dart
      widgets/
        exercise_card.dart
        exercise_form_modal.dart
        exercise_detail_screen.dart
        exercise_library_screen.dart   # Phase 2
    achievements/              # NEW (Phase 2)
      achievements_screen.dart
      widgets/
        achievement_card.dart
        badge_share_card.dart          # Phase 3
    dashboard/                 # NEW (Phase 3)
      consistency_dashboard.dart
      skill_dashboard.dart
    onboarding/                # (existing)
    settings/                  # (enhanced — moved from screens/)
      widgets/
        theme_selector.dart    # Phase 1: Skins
        notification_settings.dart # Phase 2
  providers/
    # existing providers +
    exercise_provider.dart
    exercise_storage_provider.dart
    streak_provider.dart
    achievement_provider.dart
    goals_provider.dart
    notification_provider.dart
    theme_mode_provider.dart
  services/
    # existing services +
    exercise_storage_service.dart
    achievement_service.dart
    streak_service.dart
    notification_service.dart
    goal_storage_service.dart
  theme/
    app_theme.dart             # Enhanced with multiple skins
    skins/
      dark_skin.dart
      colorful_skin.dart
      minimal_skin.dart
  widgets/
    # existing +
    confirmation_dialog.dart   # Reusable confirm modal
    stat_card.dart             # Unified stat card
    empty_state.dart           # Shared empty state
    streak_badge.dart          # Reusable streak display
```

### Storage Strategy Evolution

| Phase | Storage | Reasoning |
|---|---|---|
| Current | SharedPreferences (JSON strings) | Simple, works for small data |
| Phase 0-1 | SharedPreferences (same) | Keep consistency, data volume still low |
| Phase 2+ | Consider migration to **Isar** or **Drift** (SQLite) | Exercise library, complex queries, better performance for charts |

> **Decision Point:** Evaluate at the start of Phase 2 whether to migrate storage. If exercise count stays low (<100) and queries are simple, SharedPreferences remains viable. If charts need date-range aggregations, migrate to SQLite/Drift.

### State Management (No Changes)

- Keep **Riverpod** (`StateNotifier` + `StateNotifierProvider`) as primary
- Keep **BLoC/Cubit** only for `MetronomeAudioCubit`
- New features follow the same pattern: immutable state + `copyWith()` + services inside notifiers

---

## 4. Phase 0: Foundation & MVP Hardening

**Duration:** 4 weeks (20 work days at 4h/day)  
**Goal:** Fix known gaps, add essential metronome features, prepare the foundation for tracking.

### 0.1 Persist Pomodoro Settings

**What:** Save `PomodoroSettings` to SharedPreferences so they survive app restarts.

| Task | Files Affected |  EEE |
|---|---|---|
| Add save/load methods to `PomodoroStorageService` | `services/pomodoro_storage_service.dart` | 0.5 |
| Call load on `PomodoroSettingsNotifier` init | `providers/pomodoro_settings_provider.dart` | 0.5 |
| Call save on every settings update | `providers/pomodoro_settings_provider.dart` | 0.5 |
| Test persistence round-trip | — | 0.5 |

**State Change:** `PomodoroSettings` stays the same; storage is the only change.

---

### 0.2 Persist Metronome BPM

**What:** Save BPM to SharedPreferences (like volume already is).

| Task | Files Affected |  EEE |
|---|---|---|
| Add BPM save/load to `MetronomeNotifier` | `providers/metronome_provider.dart` | 0.5 |
| Load saved BPM on init, sync to audio service | `providers/metronome_provider.dart` | 0.5 |

**State Change:** No new fields — just persistence of existing `bpm`.

---

### 0.3 History Delete Confirmation

**What:** Add a confirmation dialog before deleting a session in History.

| Task | Files Affected |  EEE |
|---|---|---|
| Create reusable `ConfirmationDialog` widget | `widgets/confirmation_dialog.dart` (new) | 0.5 |
| Wire into `SessionCard` delete action | `features/history/widgets/session_card.dart` | 0.5 |
| Localize confirmation strings | `l10n/app_en.arb`, `l10n/app_pt.arb` | 0.25 |

---

### 0.4 Tap Tempo

**What:** A button the user taps repeatedly to set BPM from their own rhythm.

**Design:**
- New widget: `TapTempoButton` — circular button with a "hand tap" icon
- Logic: Records last 4-8 tap timestamps, calculates average interval, converts to BPM
- Minimum 2 taps to calculate; resets after 2s of inactivity
- Clamps result to 60-360 BPM range

| Task | Files Affected |  EEE |
|---|---|---|
| Implement tap tempo logic in `MetronomeNotifier` | `providers/metronome_provider.dart` | 1 |
| Create `TapTempoButton` widget | `features/metronome/widgets/tap_tempo_button.dart` (new) | 1 |
| Integrate into mobile + desktop layouts | `metronome_mobile_page.dart`, `metronome_desktop_page.dart` | 0.5 |
| Localize strings | `l10n/` | 0.25 |

**State Change:** Add to `MetronomeState`:
```dart
List<DateTime> tapTimestamps  // transient, not persisted
```

---

### 0.5 Subdivisions

**What:** Allow the metronome to play subdivisions (quarter notes, 8th notes, 16th notes, triplets).

**Design:**
- New enum: `Subdivision { quarter, eighth, sixteenth, triplet }`
- Audio: Subdivisions play at lower volume (60% of main click)
- UI: Chip-based picker (like time signature)

| Task | Files Affected |  EEE |
|---|---|---|
| Add `Subdivision` enum and state field | `providers/metronome_provider.dart` | 0.5 |
| Implement subdivision audio in `MetronomeAudioCubit` | `services/metronome_audio_service.dart` | 2  |
| Create `SubdivisionPicker` widget | `features/metronome/widgets/subdivision_picker.dart` (new) | 1 |
| Integrate into layouts | mobile/desktop pages | 0.5 |
| Localize | `l10n/` | 0.25 |

**State Change:** Add to `MetronomeState`:
```dart
Subdivision subdivision  // default: Subdivision.quarter
```

---

### 0.6 Sound Selection

**What:** Multiple click sound packs (e.g., Classic Click, Woodblock, Rim Shot, Hi-Hat, Digital).

**Design:**
- New enum: `MetronomeSound { classic, woodblock, rimshot, hihat, digital }`
- Each sound has a `tick` + `accent` WAV pair in `assets/sounds/`
- UI: Modal or chip selector on metronome screen
- Persisted to SharedPreferences

| Task | Files Affected |  EEE |
|---|---|---|
| Add sound assets (5 pairs) | `assets/sounds/` | 0.5 |
| Add `MetronomeSound` enum, state field, persistence | `providers/metronome_provider.dart` | 1 |
| Update `MetronomeAudioCubit` to load selected sound | `services/metronome_audio_service.dart` | 1 |
| Create `SoundSelector` widget | `features/metronome/widgets/sound_selector.dart` (new) | 1 |
| Integrate + localize | layouts + `l10n/` | 0.5 |

**State Change:** Add to `MetronomeState`:
```dart
MetronomeSound sound  // default: MetronomeSound.classic
```

---

### 0.7 Visual Metronome Enhancement

**What:** Add an optional pendulum/flash visual mode alongside the existing beat indicators.

| Task | Files Affected |  EEE |
|---|---|---|
| Create `VisualMetronomeMode` enum (dots, pendulum, flash) | `providers/metronome_provider.dart` | 0.25 |
| Implement `PendulumVisual` widget (animated arc) | `features/metronome/widgets/pendulum_visual.dart` (new) | 1.5  |
| Implement `FlashVisual` widget (screen flash on beat) | `features/metronome/widgets/flash_visual.dart` (new) | 0.5 |
| Mode toggle in settings or metronome screen | widget | 0.5 |

---

### 0.8 Practice Timer Enhancements

**What:** Pre-set timer chips, count-up mode, auto-stop.

| Task | Files Affected |  EEE |
|---|---|---|
| Add `TimerMode` enum (pomodoro, countdown, countup) | `providers/pomodoro_provider.dart` | 0.5 |
| Add pre-set chips (5/10/15/custom) for countdown | `features/pomodoro/widgets/preset_timer_chips.dart` (new) | 1 |
| Implement count-up logic (no target, just counts) | `providers/pomodoro_provider.dart` | 1 |
| Add auto-stop toggle to settings | `features/pomodoro/widgets/pomodoro_settings_screen.dart` | 0.5 |
| Persist new settings | `services/pomodoro_storage_service.dart` | 0.5 |

---

### 0.9 User Setup (Basic Auth)

**What:** Optional local profile (name, instrument) — no server auth yet. Prepares the data model for future teacher-student features.

| Task | Files Affected |  EEE |
|---|---|---|
| Create `UserProfile` model (name, instrument, avatar color) | `core/models/user_profile.dart` (new) | 0.5 |
| Create `UserProfileStorageService` | `services/user_profile_storage_service.dart` (new) | 0.5 |
| Create `UserProfileProvider` | `providers/user_profile_provider.dart` (new) | 0.5 |
| Add profile setup to onboarding flow | `features/onboarding/onboarding_modal.dart` | 1 |
| Display profile in Settings screen | `screens/settings_screen.dart` | 0.5 |

**Note:** Full authentication (Firebase/Supabase) deferred to Future Scope (Teacher layer). For now, purely local.

---

### Phase 0 Summary

| Deliverable | Effort (4h days) |
|---|---|
| 0.1 Persist Pomodoro Settings | 2 |
| 0.2 Persist Metronome BPM | 1 |
| 0.3 History Delete Confirmation | 1.25 |
| 0.4 Tap Tempo | 2.75 |
| 0.5 Subdivisions | 4.25 |
| 0.6 Sound Selection | 4 |
| 0.7 Visual Metronome | 2.75 |
| 0.8 Practice Timer Enhancements | 3.5 |
| 0.9 User Setup | 3 |
| **QA / Bug Fixes / Polish** | **2** |
| **Total** | **~26.5 days (rounded to 4 weeks)** |

---

## 5. Phase 1: Basic Practice Tracking

**Duration:** 6 weeks (30 work days at 4h/day)  
**Goal:** Introduce the Exercise System, BPM progress tracking, global consistency tracking, and UI skins.

### 1.1 Exercise System

**What:** Users create exercises with name, category, starting/target BPM, and notes.

**Data Model:**

```dart
class Exercise {
  final String id;
  final String name;
  final String category;        // e.g., "Scales", "Chords", "Rhythm", "Technique"
  final int startingBpm;
  final int targetBpm;
  final int lastMaxBpm;         // best BPM achieved
  final String notes;
  final DateTime createdAt;
  final DateTime lastPracticedAt;
  final List<ExerciseSession> sessions;
}

class ExerciseSession {
  final DateTime date;
  final int bpm;
  final int durationMinutes;
  final String? source;         // 'manual', 'pomodoro', 'metronome'
}
```

**Architecture:**

| Component | File | Purpose |
|---|---|---|
| `ExerciseStorageService` | `services/exercise_storage_service.dart` | CRUD for exercises in SharedPreferences |
| `ExerciseNotifier` | `providers/exercise_provider.dart` | State management for exercise list + active exercise |
| `ExerciseScreen` | `features/exercises/exercise_screen.dart` | List of exercises with search/filter |
| `ExerciseFormModal` | `features/exercises/widgets/exercise_form_modal.dart` | Create/edit exercise |
| `ExerciseCard` | `features/exercises/widgets/exercise_card.dart` | Exercise list item |
| `ExerciseDetailScreen` | `features/exercises/widgets/exercise_detail_screen.dart` | Full detail with session history |

**Navigation:** Add "Exercises" tab to bottom nav (between History and Learning Paths).

| Task |  EEE |
|---|---|
| Data model + storage service | 2  |
| Exercise provider (state, CRUD) | 2  |
| Exercise screen (list, search, filter by category) | 3  |
| Exercise form modal (create/edit) | 2  |
| Exercise card widget | 1 |
| Exercise detail screen (sessions list, stats) | 2  |
| Navigation integration | 1 |
| Localization (EN/PT) | 1 |

---

### 1.2 Progress Tracking (BPM per Exercise)

**What:** Record starting BPM, target BPM, and last max BPM for each exercise. Track sessions with BPM and duration.

**Integration Points:**
- When Pomodoro session is saved with an active exercise selected, auto-record the metronome BPM
- Manual recording from Exercise Detail screen
- Update `lastMaxBpm` automatically when a session exceeds it

| Task |  EEE |
|---|---|
| Add "active exercise" selection to Pomodoro screen | 1.5  |
| Auto-record exercise session on Pomodoro save | 1 |
| Manual BPM recording in Exercise Detail | 1 |
| Max BPM auto-update logic | 0.5 |
| Display BPM progress in Exercise Card (mini progress bar) | 1 |

---

### 1.3 Consistency Tracking (Global)

**What:** Automatic logging of practice dates across all features. Global "Daily Streak" counter.

**Design:**
- New `StreakService` that aggregates activity from: Pomodoro sessions, Exercise sessions, Learning Path check-ins
- Global streak displayed on main dashboard area (header or dedicated widget)
- Streak persisted separately for fast access

**Data Model:**

```dart
class PracticeDay {
  final DateTime date;
  final int totalMinutes;
  final List<String> sources;   // which features contributed
}
```

| Task |  EEE |
|---|---|
| `StreakService` (aggregate from all sources) | 2  |
| `StreakProvider` (global streak state) | 1 |
| Streak display widget (fire icon + count) | 1 |
| Integration into Pomodoro/Exercise save flows | 1 |
| Localization | 0.5 |

---

### 1.4 UX/UI Skins

**What:** Three visual modes — Dark (current default), Colorful, Minimal "Focus Mode".

**Design:**
- `ThemeSkin` enum: `dark`, `colorful`, `minimal`
- Each skin defines: color palette, border radii, text styles, component styles
- Selection in Settings screen, persisted to SharedPreferences
- Focus Mode: stripped UI, only essential controls visible, larger fonts

| Task |  EEE |
|---|---|
| Define 3 skin color palettes + styles | 2  |
| `ThemeSkinProvider` with persistence | 1 |
| Refactor `AppTheme` to accept dynamic skin | 2  |
| Skin selector in Settings | 1 |
| Test all screens with each skin | 1 |

---

### 1.5 Advanced Metronome Features

**What:** Polyrhythm, Subdivision Mute, Random Mute, Custom Accent patterns.

| Sub-feature | Design |  EEE |
|---|---|---|
| **Polyrhythm** | Dual time display (e.g., 3:4). Second rhythm layer at different pitch. UI: secondary beat indicators row | 3  |
| **Subdivision Mute** | Toggle to silence subdivisions on specific beats. UI: tappable subdivision indicators | 1.5  |
| **Random Mute** | Randomly mute X% of beats to train internal timing. UI: slider for mute percentage | 1.5  |
| **Custom Accents** | Tap beat indicators to toggle accent/normal/ghost. Per-beat volume levels | 2  |

---

### Phase 1 Summary

| Deliverable | Effort (4h days) |
|---|---|
| 1.1 Exercise System | 14 |
| 1.2 Progress Tracking (BPM) | 5 |
| 1.3 Consistency Tracking (Global) | 5.5 |
| 1.4 UX/UI Skins | 7 |
| 1.5 Advanced Metronome | 8 |
| **QA / Bug Fixes / Polish** | **3** |
| **Total** | **~42.5 days (rounded to 6 weeks)** |

---

## 6. Phase 2: Smart Progression & Motivation

**Duration:** 11 weeks (54 work days at 4h/day)  
**Goal:** Exercise library, progressive tempo, advanced consistency, goals, achievements, and notifications.

### 2.1 Pre-written Exercise Library

**What:** Curated exercises with video links, tags (technique, difficulty, musical context).

**Data Model Extension:**

```dart
class LibraryExercise extends Exercise {
  final String? videoUrl;
  final List<String> tags;          // "beginner", "scales", "jazz", etc.
  final String difficulty;          // "beginner", "intermediate", "advanced"
  final String? musicalContext;     // "jazz", "rock", "classical", etc.
  final bool isBuiltIn;            // true for library exercises
}
```

| Task |  EEE |
|---|---|
| Extend Exercise model with library fields | 1 |
| Create exercise library JSON data file | 3  |
| `ExerciseLibraryScreen` (browsable, filterable by tag/difficulty) | 3  |
| "Add to My Exercises" flow (copy from library) | 1 |
| Video link integration (open in browser/player) | 1 |
| Localization | 1 |

---

### 2.2 Progressive Tempo Mode

**What:** Smart BPM ramp — user defines start BPM, target BPM, increment amount, and increment frequency. The metronome auto-increases BPM during practice.

**Data Model:**

```dart
class ProgressiveTempoConfig {
  final int startBpm;
  final int targetBpm;
  final int incrementBpm;          // e.g., +5 BPM
  final int incrementEveryBars;    // e.g., every 4 bars
  final bool autoStop;             // stop at target or loop
}
```

| Task |  EEE |
|---|---|
| `ProgressiveTempoConfig` model + state | 1 |
| Progressive logic in `MetronomeNotifier` (bar counting + auto-increment) | 3  |
| `ProgressiveTempoBar` UI (shows current position in ramp, timeline) | 2  |
| Configuration modal (start, target, increment, frequency) | 2  |
| Integration with Exercise system (use exercise start/target BPM as defaults) | 1 |
| Localization | 0.5 |

---

### 2.3 Advanced Consistency Tracking

**What:** Monthly Average BPM, Best Practice Streak, Consistency Score / "Practice Health".

**Metrics:**

```dart
class ConsistencyStats {
  final double monthlyAverageBpm;      // avg BPM across all exercises this month
  final int bestStreak;                 // all-time best streak
  final int currentStreak;             // current active streak
  final double consistencyScore;        // days practiced / days in period (e.g., 22/30 = 73%)
  final int totalPracticeMinutes;      // this month
  final Map<String, int> categoryBreakdown;  // minutes per exercise category
}
```

| Task |  EEE |
|---|---|
| `ConsistencyService` (compute all metrics from stored data) | 3  |
| Extend `HistoryProvider` with advanced stats | 2  |
| "Practice Health" card on History screen | 1.5  |
| Monthly average BPM display | 1 |
| Best streak display + current streak comparison | 1 |
| Localization | 0.5 |

---

### 2.4 Goals (Micro and Macro)

**What:** Daily, weekly, and monthly goals (e.g., "30 minutes total", "practice 5 days this week").

**Data Model:**

```dart
enum GoalPeriod { daily, weekly, monthly }
enum GoalMetric { practiceMinutes, practiceDays, bpmTarget, exercisesCompleted }

class PracticeGoal {
  final String id;
  final GoalPeriod period;
  final GoalMetric metric;
  final int targetValue;
  final bool isActive;
  final DateTime createdAt;
}

class GoalProgress {
  final PracticeGoal goal;
  final int currentValue;
  final double percentage;
  final bool isComplete;
}
```

| Task |  EEE |
|---|---|
| Goal data model + storage | 2  |
| `GoalProvider` (CRUD, progress calculation) | 3  |
| Goal creation modal (period, metric, target) | 2  |
| Goal progress cards (on History/Dashboard) | 2  |
| Auto-update goals on practice completion | 1.5  |
| Goal completion celebration (animation + chime) | 1 |
| Localization | 1 |

---

### 2.5 Achievements & Badges

**What:** Unlockable achievements based on milestones (streaks, BPM targets, consistency).

**Data Model:**

```dart
class Achievement {
  final String id;
  final String titleKey;            // localization key
  final String descriptionKey;
  final String iconAsset;
  final AchievementCategory category;
  final AchievementTier tier;       // bronze, silver, gold
  final bool isUnlocked;
  final DateTime? unlockedAt;
  final Map<String, dynamic> criteria;  // e.g., {"streak": 7}
}

enum AchievementCategory { streak, speed, consistency, dedication, mastery }
enum AchievementTier { bronze, silver, gold }
```

**Example Achievements:**
- "First 7-day streak" (bronze)
- "Reached 120 BPM clean" (bronze)
- "30-day streak" (gold)
- "Practiced every day this month" (silver)
- "Completed 100 exercises" (gold)

| Task |  EEE |
|---|---|
| Achievement data model + definitions (20-30 achievements) | 2  |
| `AchievementService` (check criteria, unlock) | 3  |
| `AchievementProvider` (state, persistence) | 2  |
| `AchievementsScreen` (grid of badges, locked/unlocked) | 2  |
| Achievement unlock notification (in-app toast) | 1 |
| Trigger checks on: session save, streak update, BPM record | 2  |
| Badge artwork/icons (simple vector badges) | 1 |
| Localization | 1 |

---

### 2.6 Smart Notifications

**What:** Local notifications based on progress and streak status.

**Trigger Rules:**
- "You missed practice today" — sent at user-configured time if no activity
- "7-day streak — don't break it!" — sent when at risk of losing a streak
- "You're close to unlocking [Achievement]" — progress-based
- "Time for your daily practice?" — optional daily reminder

| Task |  EEE |
|---|---|
| Add `flutter_local_notifications` package | 0.5 |
| `NotificationService` (schedule, cancel, permissions) | 2  |
| `NotificationProvider` (settings, enabled/disabled per type) | 1.5  |
| Notification settings screen | 1.5  |
| Streak-risk notification logic | 1 |
| Achievement-progress notification logic | 1 |
| Daily reminder scheduling | 0.5 |
| Platform setup (iOS permissions, Android channels) | 1 |
| Localization | 0.5 |

---

### Phase 2 Summary

| Deliverable | Effort (4h days) |
|---|---|
| 2.1 Pre-written Exercise Library | 10 |
| 2.2 Progressive Tempo Mode | 9.5 |
| 2.3 Advanced Consistency Tracking | 9 |
| 2.4 Goals (Micro/Macro) | 12.5 |
| 2.5 Achievements & Badges | 14 |
| 2.6 Smart Notifications | 9.5 |
| **QA / Bug Fixes / Polish** | **4** |
| **Total** | **~68.5 days (rounded to 11 weeks)** |

---

## 7. Phase 3: Refinement & Engagement

**Duration:** 6 weeks (30 work days at 4h/day)  
**Goal:** Visual charts, BPM/skill streaks, dual dashboards, gamification rewards, social sharing.

### 3.1 Visual Progress Charts

**What:** Interactive charts for BPM progress, practice time, and technique balance.

**Charts:**
1. **BPM per Exercise** — Line chart showing BPM over time per exercise
2. **Time Practiced per Week** — Bar chart showing weekly practice minutes
3. **Technique Balance** — Radar/pie chart showing time distribution across categories

**Package:** `fl_chart` (Flutter charting library)

| Task |  EEE |
|---|---|
| Add `fl_chart` dependency | 0.25 |
| BPM line chart widget (per exercise, selectable date range) | 3  |
| Weekly practice time bar chart | 2  |
| Technique balance chart (radar or pie) | 2  |
| Chart integration into History + Exercise Detail screens | 1.5  |
| Localization | 0.5 |

---

### 3.2 BPM / Skill Streak

**What:** Track "Max clean BPM" streaks — consecutive days of improving or maintaining max BPM. "Decay" logic reduces streak if no practice.

**Design:**
- Separate from daily practice streak (consistency vs. skill)
- "Clean BPM" = user-confirmed (button to mark a session as "clean play")
- Decay: After 3 days of no practice on an exercise, skill streak resets
- Improvement streak: consecutive days where max BPM >= previous day's max

| Task |  EEE |
|---|---|
| Skill streak calculation logic | 2  |
| "Mark as clean" toggle on session recording | 1 |
| Decay timer logic | 1 |
| Skill streak display widgets | 1 |
| Integration with Exercise Detail | 0.5 |

---

### 3.3 Dual Dashboards

**What:** Two separate dashboard views: **Consistency** (practice habit) vs. **Skill** (BPM progression).

**Consistency Dashboard:**
- Current streak, best streak
- Practice Health score
- Calendar heatmap (last 90 days)
- Weekly goal progress

**Skill Dashboard:**
- Top BPMs per exercise
- Improvement trends
- BPM milestones achieved
- Skill streak status

| Task |  EEE |
|---|---|
| Dashboard tab navigation (Consistency / Skill toggle) | 1 |
| Consistency dashboard layout + widgets | 3  |
| Skill dashboard layout + widgets | 3  |
| 90-day calendar heatmap widget | 2  |
| Integration with existing History screen or new Dashboard tab | 1 |

---

### 3.4 Gamification Rewards

**What:** Streaks unlock rewards: new skins, challenge exercises, cosmetic customizations.

**Design:**
- Reward tiers tied to streak milestones (7, 14, 30, 60, 90 days)
- Unlockable skins (beyond the 3 base skins from Phase 1)
- Challenge exercises (harder variants unlocked by streaks)
- Cosmetic: metronome sound packs, badge borders

| Task |  EEE |
|---|---|
| Reward definition system (milestone → reward mapping) | 1 |
| Reward unlock logic in `AchievementService` | 1.5  |
| Reward display in Achievements screen | 1 |
| Additional skin assets (2-3 premium skins) | 1.5  |
| Challenge exercise flagging in library | 1 |
| Unlock animation/celebration | 0.5 |

---

### 3.5 Social: Shareable Badge Images

**What:** Generate shareable images of achievements/badges for social media.

| Task |  EEE |
|---|---|
| Badge share card design (exercise + BPM + streak + badge) | 2  |
| Screenshot/image generation (using `screenshot` or `RenderRepaintBoundary`) | 1.5  |
| Share sheet integration (`share_plus` package) | 0.5 |
| Platform-specific share testing | 0.5 |

---

### Phase 3 Summary

| Deliverable | Effort (4h days) |
|---|---|
| 3.1 Visual Progress Charts | 9.25 |
| 3.2 BPM / Skill Streak | 5.5 |
| 3.3 Dual Dashboards | 10 |
| 3.4 Gamification Rewards | 6.5 |
| 3.5 Social: Shareable Badges | 4.5 |
| **QA / Bug Fixes / Polish** | **3** |
| **Total** | **~38.75 days (rounded to 6 weeks)** |

---

## 8. Future Scope: Teacher-Student Layer

> This is a separate project phase requiring backend infrastructure.

| Feature | Key Functionalities | Dependencies |
|---|---|---|
| **Authentication** | Firebase Auth or Supabase Auth (email + social login) | Backend service |
| **Cloud Sync** | Sync practice data across devices | Cloud database (Firestore/Supabase) |
| **Teacher Dashboard** | View student practice time, streaks, BPM progress | Web dashboard or in-app role |
| **Exercise Assignment** | Teacher assigns exercises to students | Shared exercise library |
| **Minimum Goals** | Teacher sets practice minimums for students | Goal system extension |
| **Practice Comments** | Teacher comments on practice logs | Messaging system |
| **Student Groups** | Organize students by class/level | Group management |

**Estimated Effort:** 40-60 work days (separate planning required)

---

## 9. New Dependencies

| Package | Phase | Purpose |
|---|---|---|
| `fl_chart` | Phase 3 | Charts and data visualization |
| `flutter_local_notifications` | Phase 2 | Smart notifications |
| `share_plus` | Phase 3 | Social sharing |
| `screenshot` | Phase 3 | Badge image generation |
| `path_provider` | Phase 3 | File system access for generated images |

> **Storage migration (optional, Phase 2):** `drift` or `isar` if SharedPreferences becomes a bottleneck.

---

## 10. File Structure Evolution

### New Files by Phase

**Phase 0 (new files):**
```
lib/
  widgets/confirmation_dialog.dart
  features/metronome/widgets/tap_tempo_button.dart
  features/metronome/widgets/subdivision_picker.dart
  features/metronome/widgets/sound_selector.dart
  features/metronome/widgets/pendulum_visual.dart
  features/metronome/widgets/flash_visual.dart
  features/pomodoro/widgets/preset_timer_chips.dart
  core/models/user_profile.dart
  services/user_profile_storage_service.dart
  providers/user_profile_provider.dart
```

**Phase 1 (new files):**
```
lib/
  features/exercises/exercise_screen.dart
  features/exercises/widgets/exercise_card.dart
  features/exercises/widgets/exercise_form_modal.dart
  features/exercises/widgets/exercise_detail_screen.dart
  providers/exercise_provider.dart
  services/exercise_storage_service.dart
  providers/streak_provider.dart
  services/streak_service.dart
  providers/theme_mode_provider.dart
  theme/skins/dark_skin.dart
  theme/skins/colorful_skin.dart
  theme/skins/minimal_skin.dart
```

**Phase 2 (new files):**
```
lib/
  features/exercises/widgets/exercise_library_screen.dart
  features/metronome/widgets/progressive_tempo_bar.dart
  features/metronome/widgets/progressive_tempo_config_modal.dart
  features/achievements/achievements_screen.dart
  features/achievements/widgets/achievement_card.dart
  providers/achievement_provider.dart
  services/achievement_service.dart
  providers/goals_provider.dart
  services/goal_storage_service.dart
  providers/notification_provider.dart
  services/notification_service.dart
  assets/data/exercise_library.json
```

**Phase 3 (new files):**
```
lib/
  features/history/widgets/bpm_chart.dart
  features/history/widgets/time_chart.dart
  features/history/widgets/technique_balance_chart.dart
  features/dashboard/consistency_dashboard.dart
  features/dashboard/skill_dashboard.dart
  features/dashboard/widgets/calendar_heatmap.dart
  features/achievements/widgets/badge_share_card.dart
```

---

## 11. Data Model Evolution

### State Provider Map (Final)

```
EXISTING (keep)                    NEW
─────────────────                  ───
metronomeProvider                  exerciseProvider
pomodoroProvider                   streakProvider
pomodoroSettingsProvider           achievementProvider
historyProvider                    goalsProvider
learningPathsProvider              notificationProvider
navigationProvider                 themeModeProvider
onboardingProvider                 userProfileProvider
```

### Storage Keys (SharedPreferences)

```
EXISTING                           NEW
────────                           ───
metronome_volume                   metronome_bpm
pomodoro_sessions                  metronome_sound
active_learning_path_id            metronome_subdivision
learning_paths                     pomodoro_settings
onboarding_completed               exercises
experience_mode                    exercise_sessions
metronome_optin_dismissed          streak_data
                                   achievements
                                   practice_goals
                                   notification_settings
                                   theme_skin
                                   user_profile
```

---

## 12. Timeline & Gantt

### Effort Conversion

- 1 Effort Day = 8 productive hours
- 1 Work Day = 4 productive hours
- Therefore: 1 Effort Day = 2 Work Days

### Schedule

| Phase | Start | Duration | Work Days (4h) | End |
|---|---|---|---|---|
| **0. Foundation & MVP** | Week 1 (Feb 9) | 4 weeks | ~27  | Mar 8, 2026 |
| **1. Basic Tracking** | Week 5 (Mar 9) | 6 weeks | ~43  | Apr 19, 2026 |
| **2. Progression & Motivation** | Week 11 (Apr 20) | 11 weeks | ~69  | Jul 5, 2026 |
| **3. Refinement & Engagement** | Week 22 (Jul 6) | 6 weeks | ~39  | Aug 16, 2026 |

### Visual Gantt

```
2026    Feb        Mar        Apr        May        Jun        Jul        Aug
        |----------|----------|----------|----------|----------|----------|----------|
Phase 0 |██████████████████|
        | Foundation & MVP |
                           |
Phase 1                    |██████████████████████████|
                           |   Basic Practice Tracking |
                                                      |
Phase 2                                               |██████████████████████████████████████████████|
                                                      |      Smart Progression & Motivation          |
                                                                                                    |
Phase 3                                                                                             |██████████████████████████|
                                                                                                    | Refinement & Engagement  |
```

### Key Milestones

| Date | Milestone |
|---|---|
| **Mar 8, 2026** | MVP v2.0 — Enhanced metronome, persistent settings, tap tempo, subdivisions |
| **Apr 19, 2026** | v2.5 — Exercise system, BPM tracking, global streaks, UI skins |
| **Jul 5, 2026** | v3.0 — Exercise library, progressive tempo, achievements, goals, notifications |
| **Aug 16, 2026** | v4.0 — Charts, dual dashboards, gamification, social sharing |

### Total Effort

| Metric | Value |
|---|---|
| Total Work Days (4h) | ~178  |
| Total Weeks | ~27 weeks |
| Total Calendar Months | ~6.5 months |

---

## 13. Gamification Design Notes

### Dual Dopamine Loop

The gamification system targets two distinct psychological rewards:

1. **Habit Satisfaction (Consistency Streak)**
   - Daily practice streaks form habits
   - Low barrier: even a 5-minute warmup counts
   - Rewards: skins, cosmetic customizations
   - Loss aversion: "Don't break your streak!" notifications

2. **Skill Improvement (BPM Streak)**
   - BPM progression rewards pushing limits
   - Higher barrier: must improve or maintain max BPM
   - Rewards: challenge exercises, advanced features
   - No punishment for rest days (skill streaks pause, don't break)

### Reward Tiers

| Streak Days | Reward |
|---|---|
| 7  | Bronze badge + 1 new metronome sound |
| 14  | Silver badge + "Colorful" skin variant |
| 30  | Gold badge + 1 challenge exercise |
| 60  | Platinum badge + "Neon" premium skin |
| 90  | Diamond badge + full challenge exercise pack |

### Monthly Summary

At the end of each month, show a summary card:
- **Consistency Score** (days practiced / total days)
- **Speed Score** (BPM improvement percentage)
- **Balance Score** (variety of exercises practiced)
- Shareable as an image

### Why This Works for Musicians

- Daily Streaks encourage showing up even for short warmups
- BPM Streaks encourage deliberate practice (pushing tempo boundaries)
- The combination provides both habit formation AND measurable skill growth
- Shareable badges create social accountability in student groups

---

## 14. Risk & Mitigation

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| SharedPreferences doesn't scale for exercise library | Performance degradation | Medium | Evaluate at Phase 2 start; migrate to Drift/Isar if needed |
| `metronome` package doesn't support subdivisions natively | Blocks Phase 0.5 | Medium | Implement subdivision logic in Dart (scheduled secondary ticks) |
| Notification permissions rejected by users | Smart notifications useless | Medium | Make notifications optional; provide in-app alternatives |
| Scope creep on Exercise Library content | Delays Phase 2 | High | Start with 10-15 exercises; add more post-launch |
| Cross-platform chart rendering issues | Broken charts on some platforms | Low | Test `fl_chart` on all target platforms early in Phase 3 |
| Solo developer burnout over 27 weeks | Delays, quality drop | Medium | Strict 4h/day limit; ship phases independently as releases |
| Audio engine limitations for polyrhythm | Feature degradation | Medium | Prototype polyrhythm in Phase 0; descope if `metronome` package can't handle it |

---

*This document is a living plan. Review and adjust at each phase boundary based on user feedback and development velocity.*
