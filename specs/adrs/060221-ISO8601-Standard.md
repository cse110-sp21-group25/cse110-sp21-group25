# Weeks are using the ISO 8601 standard.

* Status: Accepted
* Deciders: Brian Wong, Jesse Wolf
* Date: 06-02-21

## Context and Problem Statement

When the months transitions, what week is the first day of the new month a part of?

## Decision Drivers <!-- optional -->

* Time - We did not have much time left to work on the project.
* Standard - ISO 8601 was used internationally, but not in a few countries including
the U.S.

## Considered Options

* Come up with our own implementation of weeks
* Use ISO 8601 standard

## Decision Outcome

Chosen option: We chose the ISO 8601 standard because the standard already determines
what all of the weeks in a given year are. As such, it is easy to reference which week
a given journal entry relates to.

### Positive Consequences <!-- optional -->

* If we run into any more time standard issues, we can hopefully use the ISO 8601
standard to resolve them.

### Negative Consequences <!-- optional -->

* None so far.

## Pros and Cons of the Options <!-- optional -->

### Our own solution

* Good, because we would imagine that most of our users would be from the U.S. and
using the standard Sun-Sat weeks would be more intuitive for our userbase.
* Bad, because the solution would require more time to brainstorm and implement than
already using a known standard.

### ISO 8601

* Good, because epoch calendar already provides JavaScript code that gets the ISO
8601 week given a date object.
* Good, because the standard is rather straightforward.
* Bad, because it does not follow the same conventions likely to be used by our
userbase.
