# vocabTrainer -  a vocabulary training website

## Features
#### Implemented
- **responsive design** for both mobile and desktop devices
- dynamically loaded contents with AJAX (jQuery)
- any learning languages supported as of UTF-8 standard

###### Lesson overview
- list of `.txt` files in `training/` directory to choose lesson
- badge with number of vocables per lesson

###### Training dialog
- randomly generated multiple choice dialog for both learning directions with animated swap button
- green or red colored feedback box on answer

###### Statistics page
- statistics for every lesson and in total
- progress bar in green and red for every lesson and tooltips with percentage
- number of answered vocables in total, correct and wrong answered vocables
###### Settings
- settings for creating new lessons or upload lesson `.txt` files
  - modal upload dialog

#### Planned
- English UI translation
- Create lessons with a online editor
- Verifying of legally uploaded lesson textfiles
- Track progress of lesson e.g. with progress bar and/or in statistics
    - choose between random vocables or in order of `.txt` file

## Server-side generated and stored files
- training lessons (`.txt`) - uploaded ~~or created online~~ by user
- statistics in `.json` format generated and managed by server

## Used libraries
- [Twitter Bootstrap](http://getbootstrap.com/) v4.0.0-alpha.6
- [jQuery](https://jquery.com/) v3.2.1
- [Tether](http://tether.io/) v1.4.0 - tooltips

## Images
- from [Pexels](https://www.pexels.com/) (CC0)
