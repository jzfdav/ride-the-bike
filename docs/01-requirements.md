# Requirements

## Functional Requirements
- List required behaviors and features

Core Features
    Odometer Progress: A primary gauge showing progress toward a custom service interval.
    The "Battery Decay" Algorithm: 
        * If LastRideDate is Today → 100%
        * Daily decay: −5%
        * Calculated as: Health=100−(DaysSinceLastRide×5)
    The "Service Chase" Formula:
        DailyTarget = (TargetOdo − CurrentOdo) / DaysRemaining
        Where DaysRemaining = Days until the user-defined Service Due Date.

Advanced Modules
    Fuel Tracker: Log refuel events (liters, cost, odometer) and calculate average fuel efficiency.
    Tyre Monitor: Manual tracking of front and rear tyre pressure (PSI).
    Rider Insights: Integration with Open-Meteo to show current temperature, rain probability, and AQI.
    Maintenance: Chain lubrication tracker (suggested every 500km).
    Checklist: Interactive pre-ride safety checklist.

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
