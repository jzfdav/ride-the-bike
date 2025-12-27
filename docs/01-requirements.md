# Requirements

## Functional Requirements
- List required behaviors and features

Core Features
    Odometer Progress: A primary gauge showing 10,000 → 13,000 km (service interval target based on last service at 10,000 km).
    The "Battery Decay" Algorithm: 
        * If LastRideDate is Today → 100%
        * Daily decay: −5%
        * Calculated as: Health=100−(DaysSinceLastRide×5)
    The "Service Chase" Formula:
        DailyTarget = (13000 − CurrentOdo) / DaysRemaining
        Where DaysRemaining = 90 days from service date (or project start)

Design Specs
    Theme: OLED True Black (#000000).
    Accent: Pulsar Neon Blue (#0052cc) and "Warning Orange" for low battery health.
    Font: Clean, monospaced fonts for that "dashboard" feel.

## Non-Functional Requirements
- Performance
- Security
- Usability
- Scalability (if applicable)

## Out of Scope
- Clearly list excluded items
