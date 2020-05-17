---
title: 'Static Site Generators: A Brief History'
tags: ['draft', 'static-websites', 'web-history', 'server-side-rendering']
created: '2019-06-02'
---

Hype keeps building up around [static site generators](https://www.google.com/search?q=best+static+site+generator+2019). But this approach has been around for much longer than most people think. Our industry's collective memory is very short, so let me see if I can help with a little historical perspective.

<!-- abstract -->

In the beginning the whole web was [static](http://info.cern.ch/). Then there was [CGI](https://en.wikipedia.org/wiki/Common_Gateway_Interface) and *webmasters* could then stitch together some dynamic rendering, as well as respond to forms posted by users.

Within less than 3 years, CGI evolved into a panoply of [glue languages](https://en.wikipedia.org/wiki/Scripting_language#Glue_languages), developed exclusively for this purpose (e.g.: ColdFusion, PHP, Ruby, ASP, JSP) or quickly adapted to it (e.g.: Perl, Python).

## The golden age of MVC

With the rise of these scripting languages, application servers, and the free relational databases, [dynamic server-side rendering](https://dev.to/sunnysingh/the-benefits-and-origins-of-server-side-rendering-4doh) went from being the next big thing to completely taking over the landscape, all in a couple of years.

At some point, MVC was everywhere, and OO was the craft. And with them, a hundred ColdFusion, PHP, Ruby, Python, Java, and .Net frameworks. And soon enough, the scene matured into CMSs of all sizes and flavors. Here's an article from 2007 about the [history of the dynamic web](https://royal.pingdom.com/a-history-of-the-dynamic-web/) for a bit of perspective, from deep within the bubble.

## Actually, the dark age of MVC

When I joined [SAPO](https://www.sapo.pt/) in 2008 I had totally jumped on the MVC framework bandwagon and I didn't really know better. One code base for front (html, rss, atom) and back office (a CMS). A nice object oriented approach. It all looked good, no smell.

Unfortunately, these "database driven websites" were not scaling that well. Don't get me wrong, they were dealing with complexity pretty fine, consuming and producing a variety of services, plugged into offline distributed processes, brokers, full-on SOA, the works.

Run-time, though, writes and reads were competing for stretched out DB servers, and in order to keep latency at acceptable levels, and to serve the apps wuth decent availability, operational costs were spiking.

But I was so by blinded by the automagical lights, that I categorised all these under *optimise me*. Caching partials and responses, using reverse proxies, abusing cache farms, replicating the DB, optimising code, ... There would always be a technical solution for that.

## Rendering like rebels.

Meanwhile, back to SAPO, the older crew there, thought differently.

These were a bunch of very talented engineers, and a handful of legend level Perl and C developers, that had built a network of hundreds of large scale, [high traffic, high availability websites](https://www.similarweb.com/website/sapo.pt#pro), among so many other things, like dozens of mobile apps and even [sending tech to space](http://makerfairelisbon.com/en/2014/07/16/spacebits.html) just for fun.

So how did they think differently from the predominant MVC doctrine? Pre-rendering all the static content, and serving pure html+css first.And then a layer of client-side progressive enhancement, rendering all user aware content, such as comments, ratings, favorites, in the browser.

Whenever an editor published something on their CMS, entire websites or sections, were re-generated. After all, these back offices had like 2 journalists and an intern doing most of the writes. While the actual websites had millions of unique users, doing all the reads.

What was going on here? How could a bunch of perl scripts be better than a neat, object oriented, modular, extensible approach? I was totally missing the point.

And an important one: pre-rendering, or pre-burning, "queimar" in Portuguese, materializing the state before the reads, wasn't at all the latest silver bullet as of 2008. It was actually the original craft and it had been around for 10 years.

## When the only tool you have is a hammer...

... everything looks like a nail. And that's exactly what was happening back then. The industry at large, the majority of devs, were rallying the MVC hammers at everything.

Meanwhile, the web-standards movement was striking win after win. With Firefox and Chrome, the browser was becoming a platform, and client-side rendering, beyond Ajax hacks, was becoming a believable idea.

Suddenly, the paradigm was shifting. Along came NodeJS, the NoSQL movement, and a massive simplification of the application server approach. Ditch relational, ditch transactional. Embrace REST, eventual consistency, schemaless, streams, and client-side rendering. The new bandwagon and the rising tide of followers was flowing on the exact opposite direction of the previous 10 years.

Fast forward to 2013, the rise of ES6, javscript build tools, webpack, npm, and the fullstack developer. Suddenly every project must be built as frontend rendered single page application. Every startup must hire a team capable of such. Every web development recruiter dictates so.

Landing page? SPA!, personal website? SPA! newspaper? SPA!, e-commerce? SPA! dating app for lonely pets? SPA!

@todo facepalm

SPA! is the new hammer and it makes a lovely sound.

## History repeats itself

Long story long, welcome to 2019. People are writing posts [explaining SSG](https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38) maybe ignoring that the second wave of the web was entirely built that way. Somewhere else, someone is [making the case for static site generation](https://davidwalsh.name/introduction-static-site-generators) every single day.

[Gatsby](https://www.gatsbyjs.org/), [React Static](https://github.com/react-static/react-static/), [Next](https://nextjs.org/) are all the rage. But to be fair to prior art, in the early 2010s, projects like [Jekyll](https://jekyllrb.com/) then [Hugo](https://gohugo.io/) were already getting a lot of traction in some circles and paved the way for [so many SSG options we have now](https://www.staticgen.com/). They are unfortunately not written in everyone's love/hate scripting language, but in Ruby and Go, respectively.

> Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organisation sites. Think of it like a file-based CMS, without all the complexity.

*Circling back to the whole point of this post.* If you do a quick search for "static site generation" pre 2000s you can find gems like this paper on [Tools and Approaches for Developing Data-Intensive Web Applications: a Survey](http://webml.deib.polimi.it/upload/ent5/1/CompSurvey.pdf), all the way back in 1998.

> An orthogonal architectural issue concerns the time of binding between the content of the information base and the application pages delivered to the client, which can be static when pages are computed at application definition time and are immutable during application usage; or dynamic, when pages are created just-in-time from fresh content.

Do we already know better than letting the bandwagon mentality hit us again with the new silve bullet? Are we going to make everything static site generated like we did with SPAs? Probably not. But if we don't stop obsessing (and click-baiting) about whether or not SSG is _paradigm of the year_ we will do a lot of damage to projects, businesses, and users.

We have to be a bit less excited about the present and contemplate prior art as well. Better decisions are taken when considering all the options. And the next next big thing will always be a smart mashup of a few old things.

## Conclusion

There has never been a more exciting time to develop for the web. We have the codebase, the tools, and the infrastructure to design, develop, and deploy faster, better than ever. And also options: modern SPAs, dynamic SSR, isomorphic rendering, serverless architectures, and _more recently_ SSG.

And it's never been easier to mix and match these technologies in secure, reliable, and cost-effective ways. Technologically, the entire web landscape has changed 5 times over and we are being gifted with all this potential under open source licenses for our fun and profit.

@todo links

We all - developers, teams, companies - just need to take a step back sometimes, and appreciate the options. Learn a bit about the techniques we understand the least and start choosing the right tool for each job.

<!-- notes -->

- [ ] images
- [ ] links
- [x] narrative
- [ ] fact-check
- [ ] rhythm
- [ ] proofread (use screen reader)
