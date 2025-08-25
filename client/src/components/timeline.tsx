import { Calendar } from "lucide-react";

const timelineEvents = [
  {
    year: "1997",
    title: "GRI Founded",
    description: "Global Reporting Initiative established as a multi-stakeholder initiative to develop sustainability reporting guidelines.",
    color: "bg-primary",
    side: "left"
  },
  {
    year: "2000",
    title: "UN Global Compact Launched",
    description: "United Nations launched the world's largest corporate sustainability initiative based on Ten Principles.",
    color: "bg-secondary",
    side: "right"
  },
  {
    year: "2011",
    title: "SASB Established",
    description: "Sustainability Accounting Standards Board created to develop industry-specific sustainability accounting standards.",
    color: "bg-accent",
    side: "left"
  },
  {
    year: "2021",
    title: "TNFD Launched",
    description: "Taskforce on Nature-related Financial Disclosures established to develop framework for nature-related risks.",
    color: "bg-emerald-600",
    side: "right"
  },
  {
    year: "2023",
    title: "ESRS Adopted",
    description: "European Sustainability Reporting Standards adopted by EU Commission, becoming mandatory for EU companies.",
    color: "bg-indigo-600",
    side: "left"
  }
];

export default function Timeline() {
  return (
    <section className="py-20 bg-white" data-testid="timeline-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-4">ESG Framework Evolution</h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Track the development and evolution of major ESG reporting frameworks over time.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gray-300"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className="relative flex items-center" data-testid={`timeline-event-${event.year}`}>
                {event.side === "left" ? (
                  <>
                    <div className="flex-1 pr-8 text-right">
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-end mb-2">
                          <Calendar className="h-4 w-4 text-text-secondary mr-2" />
                          <div className={`text-sm font-semibold ${event.color.replace('bg-', 'text-').replace('600', '700')}`}>
                            {event.year}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2">{event.title}</h3>
                        <p className="text-text-secondary text-sm">{event.description}</p>
                      </div>
                    </div>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${event.color} rounded-full border-4 border-white z-10`}></div>
                    <div className="flex-1 pl-8"></div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 pr-8"></div>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${event.color} rounded-full border-4 border-white z-10`}></div>
                    <div className="flex-1 pl-8">
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-4 w-4 text-text-secondary mr-2" />
                          <div className={`text-sm font-semibold ${event.color.replace('bg-', 'text-').replace('600', '700')}`}>
                            {event.year}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2">{event.title}</h3>
                        <p className="text-text-secondary text-sm">{event.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
