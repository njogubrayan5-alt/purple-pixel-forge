# Purple Pixel Forge

Build a complete, production-quality frontend website for FireboxTechs, a modern technology company that showcases its digital products, services, and completed projects.

Brand & Design

Use a white + purple visual identity.

Primary color: modern vibrant purple

Background: white in light mode

Text: dark charcoal

Purple gradients should be subtle and premium

Add a fully functional Dark Mode toggle

Dark mode should use a deep charcoal/near-black background with purple accents

Remember the user's selected theme using localStorage

Use modern, clean typography

Use Lucide-style icons instead of emojis

Use subtle animations and hover effects

Avoid excessive whitespace

Keep sections compact

The website must look excellent on both desktop and mobile

Do NOT use green as the primary brand color.

Important Layout Requirement

The website should NOT feel unnecessarily long.

On desktop, the homepage should show a large amount of useful content within the first viewport. Avoid huge hero sections, excessive vertical padding, oversized text, and empty spaces.

On mobile, make the layout compact and responsive. Do not simply stack a huge desktop layout vertically.

Use separate pages/sections where appropriate rather than creating one extremely long scrolling page.

Navigation

Create a clean sticky navbar containing:

FireboxTechs logo/brand

Home

About Us

Works

Services

Technologies

Contact

Dark Mode toggle

On mobile, replace the navigation links with a compact hamburger menu.

The FireboxTechs brand should have a recognizable purple icon/logo treatment.

Homepage Hero

Create a premium hero section with:

Badge:

"WELCOME TO FIREBOXTECHS"

Main headline:

"We Build Digital Solutions That Matter."

Supporting text:

"We help businesses and individuals transform ideas into powerful digital products, websites, applications and intelligent solutions."

Buttons:

"Explore Our Works"

"Contact Us"

Add small benefit indicators:

Modern Solutions

Quality First

On Time Delivery

On the right side of the desktop hero, create a polished technology visual showing a laptop and smartphone displaying a modern FireboxTechs-style dashboard/product interface.

Do not use photographs of people.

Featured Works

Create a compact "Featured Works" section.

Heading:

"Some Of Our Recent Projects"

Display project cards in a responsive grid.

Initially include these example projects:

CodeLab Academy

E-learning platform

Coding education platform for students and developers

CineVault

Entertainment platform

Movie streaming and discovery experience

BConnect

Marketplace

Multi-vendor marketplace connecting people and services

Firebox WhatsApp Bot

Automation

AI-powered WhatsApp automation for businesses

FireboxDeploy

Developer platform

Deployment platform for modern applications

Each project card must contain:

Project image

Project name

Category

Short description

"View Project" button

Arrow icon

Add a "View All Projects" button.

Project images should be easy to replace later.

About Us

Create an "About Us" section explaining FireboxTechs as a technology company that builds modern digital products.

Keep the section concise.

Include:

What FireboxTechs does

The company's approach

Technology-focused visual

A strong call to action

Do not make this section excessively tall.

Services

Create a dedicated Services section.

Include cards for:

Web Development

Modern websites and powerful web applications.

Button:
"Get Started"

App Development

Responsive and user-friendly digital applications.

Button:
"Get Started"

AI Solutions

AI-powered products, assistants and intelligent systems.

Button:
"Explore AI"

Automation

Bots, workflows and API integrations for businesses.

Button:
"Get Started"

Custom Software

Software designed around specific business requirements.

Button:
"Request a Project"

Every service MUST have a visible button.

When a visitor clicks a service button, open a service details page or service details view containing:

Service description

Features

Technologies

Relevant projects

Call-to-action button

Contact/request form

Technologies

Create a compact technology section displaying technologies FireboxTechs works with.

Examples:

React

JavaScript

Node.js

Express

MongoDB

APIs

Git

AI technologies

Use clean technology badges/cards.

Statistics

Add a compact statistics section such as:

30+ Projects Completed

20+ Happy Clients

2+ Years Experience

99% Client Satisfaction

Make these values easy to change later.

Contact

Create a strong but compact contact section.

Heading:

"Have an idea? Let's build it."

Supporting text:

"Tell us what you're building and let's turn your idea into something real."

Include:

Contact form

Name

Email

Service

Project description

Submit button

Also provide company contact/social links.

Project Details

When a visitor selects "View Project", show a professional project details page containing:

Project title

Large project screenshot

Description

Features

Technologies used

Project category

Live Demo button

GitHub button where available

Back to Works button

Footer

Create a compact professional footer with:

FireboxTechs logo

Short company description

Navigation links

Services links

Contact information

Social links

Copyright

Responsive Design

The website must be fully responsive.

Desktop:

Compact professional layout

Project cards displayed horizontally where appropriate

Hero content and visual side-by-side

Minimal unnecessary scrolling

Tablet:

Adapt grids automatically

Maintain comfortable spacing

Mobile:

Compact navbar

Hamburger navigation

Hero content properly resized

Project cards become one column

Service cards become one column

Buttons become touch-friendly

No horizontal scrolling

Do not make the page unnecessarily tall

Animations

Use subtle professional animations:

Fade-in sections

Card hover effects

Button hover effects

Smooth scrolling

Small image transitions

Do not overuse animations.

Architecture

Build the frontend cleanly using reusable components.

Suggested structure:

src/

components/

pages/

data/

assets/

styles/

Create reusable components for:

Navbar

Hero

ProjectCard

ServiceCard

ThemeToggle

Stats

Footer

Keep project and service information in structured data so it can later be connected to an admin dashboard/API.

Future Admin Integration

IMPORTANT:

This frontend will eventually have a separate FireboxTechs Admin Dashboard.

Do NOT build the admin dashboard into the public homepage.

Instead, structure the project so projects, services, company information, and contact messages can later come from an API/database.

The future admin will allow FireboxTechs to:

Add projects

Edit projects

Delete projects

Upload project images

Publish/unpublish projects

Add/edit services

Edit About Us content

Manage contact messages

Manage company information

The public website should therefore use reusable data structures rather than hardcoding content throughout components.

Overall Goal

Make the result look like a real premium technology company website, not a generic AI-generated template.

The final design should communicate:

FireboxTechs = modern technology + quality + innovation + real products.

Prioritize:

Clean purple/white branding

Excellent responsive design

Compact layout

Strong project showcase

Clear service buttons

Functional dark mode

Professional typography

Fast and simple user experience integration with an admin dashboard

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/110f15b1-9e38-42ee-900c-dd95582f36a7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
