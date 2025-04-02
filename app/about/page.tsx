import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us | EventHub",
  description: "Learn about EventHub's mission, team, and the story behind our event management platform.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">About EventHub</h1>
        <p className="mx-auto mb-10 max-w-3xl text-xl text-muted-foreground">
          We're on a mission to make event planning and management accessible, efficient, and enjoyable for everyone.
        </p>
        <div className="relative mx-auto h-[300px] w-full max-w-5xl overflow-hidden rounded-xl sm:h-[400px] md:h-[500px]">
          <Image
            src="/placeholder.svg?height=500&width=1200"
            alt="EventHub team"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Our Mission */}
      <section className="mb-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
            <p className="mb-4 text-lg text-muted-foreground">
              At EventHub, we believe that events bring people together and create meaningful connections. Our platform
              is designed to remove the technical barriers to event planning, allowing organizers to focus on what truly
              matters: creating memorable experiences.
            </p>
            <p className="text-lg text-muted-foreground">
              Whether you're planning a small meetup, a corporate conference, or a large-scale festival, EventHub
              provides the tools you need to succeed, from registration and ticketing to attendee engagement and
              post-event analytics.
            </p>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-xl">
            <Image src="/placeholder.svg?height=300&width=500" alt="Our mission" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-20">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Simplicity",
              description:
                "We believe in making complex tasks simple through thoughtful design and intuitive interfaces.",
            },
            {
              title: "Inclusivity",
              description:
                "We're committed to creating tools that are accessible to everyone, regardless of technical expertise.",
            },
            {
              title: "Innovation",
              description:
                "We continuously explore new technologies and approaches to improve the event management experience.",
            },
            {
              title: "Reliability",
              description:
                "We understand that events are time-sensitive, and our platform is built to be dependable when it matters most.",
            },
            {
              title: "Data Privacy",
              description:
                "We respect user data and are committed to maintaining the highest standards of privacy and security.",
            },
            {
              title: "Customer Success",
              description: "We measure our success by the success of the events hosted on our platform.",
            },
          ].map((value, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="mb-20">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & CEO",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Sam Rivera",
              role: "CTO",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Taylor Kim",
              role: "Head of Design",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Jordan Patel",
              role: "Customer Success Lead",
              image: "/placeholder.svg?height=300&width=300",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative mx-auto mb-4 h-[200px] w-[200px] overflow-hidden rounded-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20 bg-muted py-16">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "EventHub transformed how we manage our annual conference. The analytics features alone have increased our attendance by 30%.",
                author: "Maria G., Conference Organizer",
              },
              {
                quote:
                  "As someone with limited technical skills, I was able to set up my entire event in under an hour. The interface is incredibly intuitive.",
                author: "David L., Community Leader",
              },
              {
                quote:
                  "The customer support team went above and beyond to help us with a last-minute change to our event. Truly exceptional service.",
                author: "Priya S., Event Director",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="pt-6">
                  <p className="mb-4 italic">"{testimonial.quote}"</p>
                  <p className="font-semibold">— {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-20 text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Create Your Next Event?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Join thousands of event organizers who trust EventHub to bring their vision to life.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/register">Get Started for Free</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

