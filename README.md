# Readme
This README is meant to provide a high-level outline for our Point-of-Sale (POS) system.

## Project Description
The goal of our project is to create an 'open' POS system that can be used by most merchants, with an emphasis on retail.
i.e.) Any business from small grocery/convienience store to a large wholsesaler.

We intend to achieve this goal by utilizing the form factor and modular nature of Raspberry PI hardware (and various included peripherals such as a keyboard).

In addition to the hardware, we intend to create our own modules/libraries to be pre-loaded on all of our deployed systems. These modules will contain: our standard UI, a database for storing and retrieving Universal Product Codes (UPC's), comprehensive system settings (for individual merchants), and Administrative features for book-keeping and workforce management (signing employees into and out of the system).

## Project Actualization
To realize our project, we propose separating our project by the various 'user-stories' we will be creating. To that end we will be using ZenHub for managing our various stories and the tasks associated with them. We will also use GitHub for hosting our repository in the use of version control, and for tracking our commits to the various tasks.

### ZenHub Link
[ZenHub](https://app.zenhub.com/workspaces/sprint-1-5d71a06f8922ee0001373b95/board?repos=206675304)

### GitHub Link
[GitHub](https://github.com/cse442-fall-2019-offering/442projects-team-7)

Lastly, we hope to incorporate many of the skills and techniques we have accrued through our various coursework at the University at Buffalo and beyond to create a viable product that stands out.

## Minimal Viable Product (MVP)
In its most basic form, we hope to have a Raspberry PI system with a keyboard. Our Raspberry PI will host our source code, which will contain all of the necessary methods for performing merchant transactions (upc lookup and info retrieval, updatable running total, keyboard shortcut mappings, updatable item listing). It should also contain some means of database population for the particular merchant to easily access and update as necessary.
