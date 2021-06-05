# We should use localStorage to store our user's data

* Status: Accepted
* Deciders: Brian Wong, Jesse Wolf, Kevin Wong, Grady Gabriel
* Date: 06-01-21

## Context and Problem Statement

How should we store user data?

## Decision Drivers <!-- optional -->

* Time - We did not have much time to implement storage because it was week 10.
* Suggestion by Deepak - Deepak suggested that we use localStorage rather than
something like indexDB.

## Considered Options

* Some Online DB
* IndexedDB API
* localStorage

## Decision Outcome

Chosen option: We chose localStorage because Brian already had some idea on how it
worked and that it would be easier to implement. Along with this, Deepak had
recommended this option stating that he did something similar for Cogs 120.

### Positive Consequences <!-- optional -->

* As a result of using localStorage, Brian was able to begin working on storage
much quicker than had we decided to use a more sophisticated database.

### Negative Consequences <!-- optional -->

* localStorage is not the most robust way of storing content. From our brief
research, it appears that localStorage cannot store objects, arrays, or any
type of media file.

## Pros and Cons of the Options <!-- optional -->

### Some online DB

* Good, because allows users to use our web app from other devices
* Bad, because requires learning how to use that particular database and perhaps
includes hosting fees.

### IndexedDB API

* Good, because it is client-side storage so it does not require interfacing with
a server
* Good, because can store audio and video along with basic text files.
* Bad, because requires more time to learn than something like localStorage

### localStorage

* Good, because fast and easy to use
* Bad, because severely limits what type of data can be stored by our web app.
