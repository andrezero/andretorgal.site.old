---
title: 'Static Site Generators: A Brief History'
tags: ['draft', 'static-websites']
---

Hype is building up around [static site generators](https://medium.com/codingthesmartway-com-blog/top-static-site-generators-for-2019-26a4c8afcc05). To me, it all sounds like history repeating itself.

Static site generators have been around for much longer than [most people think](https://jonpersson.co/static-sites/). Our industry's collective memory is very short. Let me see if I can help with a little perspective here.

<!-- abstract -->

## Old-skool was cool

In the beggining the whole web was [static](). Then there was [CGI](https://en.wikipedia.org/wiki/Common_Gateway_Interface) and people could stich together some dynamic rendering as well as respond to forms posted by users.

With the rise of these scripting languages @todo and the free relational databases @todo, [dynamic server-side rendering](https://dev.to/sunnysingh/the-benefits-and-origins-of-server-side-rendering-4doh) became the next big thing, completely took over the landscape, and matured into enterprise grade web frameworks and CMSs of all sizes and flavours.

Unfortunately, these "database driven websites" were scaling terribly. Writes and reads were competing for stretched out DB servers. Master/slacve, clustering, cache layers, reverse proxies, an explosion of techniques to.

##

When I joined SAPO in 2006 I had drank the kool-aid of the MVC frameworks. Always rendering on demand seemed like a good idea. One code base, After all, we could cache partials and entire responses in a memcached farm, replicate the DB, optimise the code,

Whereas for the older crew there, pre-rendering all your static pages whenever an editor published something on their CMS was simply a no-brainer. After all, these backoffices had like 2 journalists and an intern doing most of the writes. While the actual websites had millions of unique users, doing all the reads.

Even with

If you do a quick search for "static site generation" pre 2000s you can find gems like this paper on [Tools and Approaches for Developing Data-Intensive Web Applications: a Survey](http://webml.deib.polimi.it/upload/ent5/1/CompSurvey.pdf), all the way back in 1998.

> An orthogonal architectural issue concerns the time of binding between the content of the information base and the application pages delivered to the client, which can be static when pages are computed at application denition time and are im- mutable during application usage; or dynamic, when pages are created just-in-time from fresh content.

##

In the early 2010s, projects like [Jekyll]() brought back sanity.

> Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Think of it like a file-based CMS, without all the complexity.

## History repeats itself

Recently, a new generation of projects are

[ssg](https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38)

and [making the case static site generation](https://davidwalsh.name/introduction-static-site-generators) as

## Conclusion

There has never been a more exciting time to develop for the web. We have the codebase, the tools, and the infrastructure to design, develop and deploy faster and better than ever. And also options: modern SPAs, dynamic SSR, isomporphic rendering, serverless architectures, and _more recently_ SSG.

And it's never been easier to mix and match these techologies in secure, reliable, and cost-effective ways. Technologically, the entire web landscape has changed 5 times over and we are being gifted with all this potential under open source licenses for our fun and profit.

But the bandwaggon mentality is still scarily predominant. People need to stop obsessing about the _next bing thing_, stop believing that the chosen _paradigm of the year_ is the perfect solution for both that landing page and that other e-commerce website. In the past couple of years, SPA frameworks became that silver bullet. But the new clickbait is now

We all - developers, teams, companies - need to take a step back and appreciate the options. Learn a bit about the techniques we understand the least. Explore and experiment. And start choosing the right tool for each job, no matter what's written in that latest trends article.
