import React, { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown, MoveRight, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import gsap from "gsap";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const answersRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const setAnswerRef = (index: number) => (el: HTMLDivElement | null) => {
    answersRef.current[index] = el;
  };

  const setContentRef = (index: number) => (el: HTMLParagraphElement | null) => {
    contentRefs.current[index] = el;
  };

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

  useEffect(() => {
    // Initialize the first FAQ if openIndex is 0
    if (openIndex === 0) {
      const answer = answersRef.current[0];
      const content = contentRefs.current[0];
      if (answer && content) {
        gsap.set(answer, { height: "auto", opacity: 1 });
        gsap.set(content, { y: 0, opacity: 1 });
      }
    }
  }, []);

  const toggleFAQ = (index: number) => {
    const answer = answersRef.current[index];
    const content = contentRefs.current[index];
    
    if (!answer || !content) return;

    if (openIndex === index) {
      // Close animation
      const tl = gsap.timeline({
        onComplete: () => setOpenIndex(null),
      });

      tl.to(content, {
        y: -10,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      }).to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      }, "-=0.1");
    } else {
      // If there's an open FAQ, close it first
      if (openIndex !== null) {
        const prevAnswer = answersRef.current[openIndex];
        const prevContent = contentRefs.current[openIndex];
        if (prevAnswer && prevContent) {
          gsap.to(prevContent, {
            y: -10,
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
          });
          gsap.to(prevAnswer, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      }

      // Open animation
      setOpenIndex(index);
      gsap.fromTo(answer,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        }
      );

      gsap.fromTo(content,
        {
          y: -10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
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

      <div className="space-y-0">
        {faqs.map((faq, index) => (
          <div key={index}
          className={`border border-gray-200 ${
            index === 0 ? 'rounded-t-lg' : index === faqs.length - 1 ? 'rounded-b-lg' : ''
          }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full flex justify-between items-center py-4 px-4 transition-colors font-bold ${
                openIndex === index ? "text-darkGold bg-[#F7F5ED]" : "text-zinc-800 hover:bg-gray-50"
              }`}
            >
              <span className="text-left font-semibold">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            <div
              ref={setAnswerRef(index)}
              className="overflow-hidden"
              style={{ height: index === 0 ? "auto" : 0, opacity: index === 0 ? 1 : 0 }}
            >
              <p
                ref={setContentRef(index)}
                className="text-gray-600 px-4 py-4"
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;