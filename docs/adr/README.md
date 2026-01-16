# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the Growteer web application.

## What are ADRs?

Architecture Decision Records are documents that capture important architectural decisions made during the development of a software project. Each ADR describes:
- The context and problem being addressed
- The decision that was made
- The consequences of that decision

## ADR Index

- [ADR-001: Feature-Sliced Architecture](./001-feature-sliced-architecture.md)
- [ADR-002: State Management Strategy](./002-state-management-strategy.md)
- [ADR-003: Internationalization with next-intl](./003-internationalization-next-intl.md)
- [ADR-004: Centralized API Client](./004-centralized-api-client.md)
- [ADR-005: API Type Generation from Schema](./005-api-type-generation.md)
- [ADR-006: Validation with Zod and React Hook Form](./006-validation-zod-react-hook-form.md)
- [ADR-007: Component Organization Patterns](./007-component-organization.md)
- [ADR-008: Data Fetching Strategy](./008-data-fetching-strategy.md)
- [ADR-009: Progressive Web App Support](./009-progressive-web-app.md)

## Format

Each ADR follows this structure:

```
# [Short title of solved problem]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Context
[Description of the issue motivating this decision]

## Decision
[The change that we're proposing or have agreed to implement]

## Consequences
[What becomes easier or more difficult to do and any risks introduced]
```

## References

- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) by Michael Nygard
- [ADR GitHub Template](https://github.com/joelparkerhenderson/architecture-decision-record)
