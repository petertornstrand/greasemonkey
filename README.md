# User scripts for Codebase

Contains user scripts for improving the UI and functionality of various parts of [Codebase](https://www.codebasehq.com).

The scripts are split into different files each dealing with a separate scope of the Codebase application.

* Global
* Projects
* Tickets
* Users

## Global

Changes the colors and logo.

## Project

Adds a "project search" function to all projects. Uses the default global search but scoped to the current
project. The search is made available on all project pages.

## Tickets

* **Copy ticket reference**: Adds a "copy ticket reference" button next to the ticket title that lets you copy
  the ticket number and subject for easy pasting into you time tracker.
* **Jump to last comment**: Adds the comment count and a quick link to scroll the latest comment into view.
* **Display tags in meta**: Moves the tags to the top of the ticket into the ticket meta area. Also adds the
  ability to use "tag prefixes" that affects the color and icon of the tag. Available prefixes `branch:` and
  `note:`.

## User

Adds a list at the top of the user page that lists all tickets worked on the current day grouped by project.

## User script mananger

I suggest using [ViolentMonkey](https://violentmonkey.github.io/) to manage your user scripts.
