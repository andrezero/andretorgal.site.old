---
title: 'Static Site Generators: A Brief History'
tags: ['draft', 'static-websites', 'web-history', 'server-side-rendering']
created: '2019-06-02'
---

Hype is building up around [static site generators](https://medium.com/codingthesmartway-com-blog/top-static-site-generators-for-2019-26a4c8afcc05). To me, it all sounds like history repeating itself.

Static site generators have been around for much longer than [most people think](https://jonpersson.co/static-sites/). Our industry's collective memory is very short. Let me see if I can help with a little perspective here.

<!-- abstract -->

## Old-skool was cool

In the beginning the whole web was [static](http://info.cern.ch/). Then there was [CGI](https://en.wikipedia.org/wiki/Common_Gateway_Interface) and people could stitch together some dynamic rendering as well as respond to forms posted by users.

@todo

## The golden age of MVC

With the rise of these scripting languages @todo and the free relational databases @todo, [dynamic server-side rendering](https://dev.to/sunnysingh/the-benefits-and-origins-of-server-side-rendering-4doh) went from being the next big thing to completely taking over the landscape, all in a couple of years.

Now MVC was everywhere, OO was the craft, and with it, a hundred ColdFusion, PHP, Ruby, Python, Java, and .Net frameworks. And soon enough, the scene matured into CMSs of all sizes and flavors, typically of the monolithic kind.

## Actually, the dark age of MVC

When I joined SAPO in 2008 I had totally jumped on the MVC framework bandwagon and I didn't really know better. One code base for front (html, rss, atom) and back office (a CMS). A nice object oriented approach. It all looked good, no smell.

Unfortunately, these "database driven websites" were scaling terribly. Don't get me wrong, they were dealing with complexity pretty fine, consuming and producing a variety of services, plugged into offline distributed processes, brokers, full-on SOA, the works. But writes and reads were competing for stretched out DB servers. Operational costs were spiking to maintain latency acceptable and availability decent.

But I was so by blinded by magical light, that the feeling was these were just optimization problems. Caching partials and responses, using reverse proxies, abusing cache farms, replicating the DB, optimizing code, ... There would always be a technical solution for that.

## Rendering like rebels.

Meanwhile, back to SAPO, the older crew there, thought differently.

These were a bunch of very talented engineers, and a handful of legend level Perl and C developers, that had built a network of hundreds of large scale, [high traffic, high availability websites](https://www.similarweb.com/website/sapo.pt#pro), among so many other things, like dozens of mobile apps and even [sending tech to space](http://makerfairelisbon.com/en/2014/07/16/spacebits.html).

So how did they think differently from the predominant MVC doctrine? Pre-rendering all the static content, and serving pure html+css first. And only then progressive enhancement and frontend rendering of user aware content, such as comments, ratings, favorites.

Whenever an editor published something on their CMS, entire websites or sections, were re-generated. After all, these back offices had like 2 journalists and an intern doing most of the writes. While the actual websites had millions of unique users, doing all the reads.

What was going on here? How could a bunch of perl scripts be better than a neat, object oriented, modular, extensible approach? I was totally missing the point.

And important one. Because pre-rendering, or pre-burning, "queimar" in Portuguese, materializing some state, wasn't the latest bullet as of 2008. It was the original craft.

## When the only tool you have is a hammer...

... every thing looks like a nail.

Meanwhile, the web-standards movement was striking win after win. The browser became a believable idea. Together with NodeJS, NoSQL @todo

Fast forward to 2013 and everything looks like a SPA. And we are kind of over the JS fatigue scare, and it just works, so the SPA is the new silver bullet.

Landing page? React!, newspaper? React!, e-commerce? React!

@todo facepalm

## History repeats itself

Gatsby, React Static, Next are @todo. And there is now a Medium [explaining SSG](https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38), and [making the case for static site generation](https://davidwalsh.name/introduction-static-site-generators) are flying through my timelines at least once a day (YMMV).

But to be fair to prior art, in the early 2010s, projects like [Jekyll]() then [Hugo]() were already having a lot of traction in some circles and paved the way for [so many SSG options we have now](https://www.staticgen.com/).

> Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Think of it like a file-based CMS, without all the complexity.

To be even more fair, If you do a quick search for "static site generation" pre 2000s you can find gems like this paper on [Tools and Approaches for Developing Data-Intensive Web Applications: a Survey](http://webml.deib.polimi.it/upload/ent5/1/CompSurvey.pdf), all the way back in 1998.

> An orthogonal architectural issue concerns the time of binding between the content of the information base and the application pages delivered to the client, which can be static when pages are computed at application definition time and are immutable during application usage; or dynamic, when pages are created just-in-time from fresh content.

We know better than letting the bandwagon mentality hit us with static site generators like it did with the SPA, so let's stop obsessing (and click-baiting) about whether or not static site generation is the _next bing thing_.

Even if it's _paradigm of the year_ it is not the solution for everything. We have to be a bit less excited about the present and contemplate prior art as well. Better decisions are taken when considering all the options.

And the next next big thing will always be the synthesis of a few other things.

## Conclusion

There has never been a more exciting time to develop for the web. We have the codebase, the tools, and the infrastructure to design, develop and deploy faster and better than ever. And also options: modern SPAs, dynamic SSR, isomorphic rendering, serverless architectures, and _more recently_ SSG.

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
