---
tags: ['static-websites', 'react-static', 'cloudfront', 'backlog', 'andretorgal-com']
created: '2019-05-23'
---

Today my V2 is uploaded to https://staging.andretorgal.com/.

What is happening, what is new and what comes next?

<!-- abstract -->

## Staging

Finished the setup of S3, Cloudfront, including https support in under 1 hour. Thanks to nice guides like this one: [Hosting Static React Websites on AWS S3 (& CloudFront) with SSL
](https://hackernoon.com/hosting-static-react-websites-on-aws-s3-cloudfront-with-ssl-924e5c134455).

Kind of a bummer I couldn't commit to my initial idea on how to segregate environments, staging and production, and how to version the content, because of [this issue in S3 + Cloudfront integration](https://stackoverflow.com/questions/35427661/subfolder-redirect-issue-with-static-website-hosting-using-s3-cloudfront-and-or) but I'm still happy with the result.

## Next

Make sure I keep my Cloudfront bills in check, so [compression in cloudfront](https://medium.com/faun/this-is-how-i-reduced-my-cloudfront-bills-by-80-a7b0dfb24128) is top priority.

For now, the entire `dist/` is _synced_ in a few seconds. I couldn't be happier with this. But _continuous integration and deployment_ will help focusing more on authoring and experimentation.

Publish my ... ahem ... design system. Get it up with [Storybook](https://storybook.js.org/use-cases/) first, then suit it up. Thank you [Hanseo](https://medium.com/@hanseopark) for the tips. I'll be glad to pay you back helping you with your website and getting out of Medium ;-)

Plenty of other [features, fixes and tweaks](/meta/project/backlog).

And a lot more content.

<!-- notes -->

## Notes

- [ ] images
- [ ] links
- [ ] narrative
- [x] fact-check
- [ ] rhythm
- [ ] proofread (use screen reader)
