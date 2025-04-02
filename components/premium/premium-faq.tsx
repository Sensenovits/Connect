import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    id: "1",
    question: "What's included in the premium subscription?",
    answer:
      "Premium includes event analytics, custom branding, advanced messaging, team collaboration, unlimited events, and priority support.",
  },
  {
    id: "2",
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your current billing period.",
  },
  {
    id: "3",
    question: "Is there a free trial available?",
    answer:
      "We don't currently offer a free trial, but we do have a 30-day money-back guarantee if you're not satisfied with the premium features.",
  },
  {
    id: "4",
    question: "How do I upgrade to premium?",
    answer:
      "You can upgrade to premium by visiting the premium pricing page and selecting the plan that best fits your needs.",
  },
  {
    id: "5",
    question: "Can I switch between monthly and annual billing?",
    answer:
      "Yes, you can switch between monthly and annual billing at any time. If you switch to annual billing, you'll save 20% compared to monthly billing.",
  },
]

export function PremiumFAQ() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our premium subscription
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

