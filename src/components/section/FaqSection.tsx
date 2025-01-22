import React, { useState } from "react";
import { ChevronUp, ChevronDown, MoveRight, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How this work?",
      answer:
        "MV AMBAI crew are standing by to Welcome you onboard. Safety Briefing, Crew Introduction, Necessary Dive Paperwork, Cabin allocation and ship orientation will take place before departing. During the first day take this opportunity to familiarize with the vessel and make yourself comfortable.",
    },
    {
      question: "Are there any additional fee?",
      answer:
        "Please contact our customer service for detailed information about additional fees.",
    },
    {
      question: "How can I get the discount?",
      answer:
        "Contact our sales team to learn about our current promotional offers and available discounts.",
    },
    {
      question: "What features do you offer and other not?",
      answer:
        "We offer comprehensive services tailored to your needs. Contact us for a detailed comparison of our features.",
    },
    {
      question: "Is it possible to refund the money?",
      answer:
        "Please refer to our refund policy or contact our customer service for detailed information about refunds.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-6xl mx-auto p-6 py-24">
      <div>
        <div className="w-12 h-[1px] bg-[#8B7F55] mb-4" />
        <h1 className="text-4xl font-light text-zinc-900 mb-8">FAQs</h1>

        <div className="text-gray-600 mb-8">
          <p>We bed any for assistance indulgence unpleasing.</p>
          <p>Not thoughts all exercise blessing.</p>
        </div>
        <Button variant={"tertiary"} rightIcon={<ArrowRight />}>MORE FAQS</Button>
      </div>

      <div className="">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200">
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full flex justify-between items-center py-4 px-4 transition-colors font-bold ${openIndex == index ? "text-darkGold bg-[#F7F5ED]" : "text-zinc-800 hover:bg-gray-50"}`}
            >
              <span className="text-left font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-4 pb-4">
                <p className="text-gray-600 p-2">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
