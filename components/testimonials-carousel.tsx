'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Card } from '@/components/ui/card'
import { useEffect } from 'react'

interface Testimonial {
  id: number
  name: string
  rating: number
  message: string
}

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ]
  )

  useEffect(() => {
    if (!emblaApi) return
  }, [emblaApi])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">

        {testimonials.map((testimonial) => (

          <div
            key={testimonial.id}
            className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-3"
          >

            <Card className="p-6 h-full">

              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-400"
                    >
                      ★
                    </span>
                  ))}
              </div>

              <p className="text-muted-foreground italic mb-5">
                "{testimonial.message}"
              </p>

              <div>
                <p className="font-semibold">
                  {testimonial.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  Customer Review
                </p>
              </div>

            </Card>

          </div>

        ))}

      </div>
    </div>
  )
}