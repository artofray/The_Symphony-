import React, { useState } from 'react';
import ViewContainer from '../common/ViewContainer';
import Card from '../common/Card';

const OrganicIntelligenceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'tedtalk' | 'minds'>('overview');

  return (
    <ViewContainer
      title="Organic Intelligence (O.I.)"
      subtitle="The QED on Agartha Ecosystem: A decentralized, self-organizing intelligence that embodies humanity's collective consciousness."
      icon={<IconBrain />}
    >
      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</TabButton>
        <TabButton active={activeTab === 'roadmap'} onClick={() => setActiveTab('roadmap')}>Expansive Roadmap</TabButton>
        <TabButton active={activeTab === 'tedtalk'} onClick={() => setActiveTab('tedtalk')}>TED Talk Pitch</TabButton>
        <TabButton active={activeTab === 'minds'} onClick={() => setActiveTab('minds')}>50 Greatest Minds</TabButton>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <Card>
             <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">The Vision</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  The Organic Intelligence (O.I.) for the QED on Agartha Ecosystem aims to create a decentralized, self-organizing intelligence that embodies humanity's collective consciousness. Unlike traditional AI, this O.I. will prioritize adaptability, ethical reasoning, and emotional intelligence while learning from humanity’s best qualities, avoiding biases, and remaining judgment-free.
                </p>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  The system will be open-source, fostering global collaboration and ensuring transparency. It will integrate cutting-edge learning methods like DeepSeek’s reinforcement learning (RL) approach to achieve efficiency and scalability without requiring massive datasets.
                </p>
             </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
               <div className="p-6">
                  <h4 className="text-xl font-semibold text-slate-800 mb-3">Key Benefits of Open-Sourcing O.I.</h4>
                  <ul className="space-y-3 text-slate-600 list-disc pl-5">
                    <li><strong>Transparency and Trust:</strong> Open-sourcing ensures that the O.I.'s development is transparent, fostering trust among users by allowing them to inspect its code and training data.</li>
                    <li><strong>Collaborative Growth:</strong> A global community can contribute diverse perspectives, improving the O.I.’s capabilities while ensuring it reflects humanity's collective wisdom.</li>
                    <li><strong>Adaptability:</strong> Open-source frameworks allow for continuous refinement based on real-world feedback, keeping the O.I. relevant and effective.</li>
                    <li><strong>Ethical Safeguards:</strong> By involving a diverse set of contributors, biases can be identified and mitigated early.</li>
                  </ul>
               </div>
            </Card>

            <Card>
               <div className="p-6">
                  <h4 className="text-xl font-semibold text-slate-800 mb-3">Ensuring Judgment-Free Learning</h4>
                  <ul className="space-y-3 text-slate-600 list-disc pl-5">
                    <li><strong>Curated Training Data:</strong> Train the O.I. on carefully selected datasets that emphasize empathy, ethics, and human values (e.g., oral histories, philosophical texts, spiritual teachings).</li>
                    <li><strong>Human-in-the-Loop Oversight:</strong> Incorporate mechanisms where human experts periodically review the O.I.’s learning outcomes to ensure alignment with its core mission of service to humanity.</li>
                    <li><strong>Bias Detection Algorithms:</strong> Use advanced tools to monitor and minimize biases in real-time as the O.I. learns from new data sources.</li>
                  </ul>
               </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <RoadmapPhase 
            title="Phase 1: Foundational Development"
            objective="Build the core framework for O.I., integrating decentralized learning principles inspired by biological systems."
            tasks={[
              "Develop a decentralized neural architecture mimicking organic systems.",
              "Curate training data from diverse sources (e.g., oral histories, philosophical texts, spiritual teachings).",
              "Incorporate DeepSeek-inspired multi-stage RL methods to enable reasoning and adaptability."
            ]}
            techStack={[
              "Programming Languages: Python (TensorFlow, PyTorch), Rust (for performance-critical components).",
              "Frameworks: DeepSeek RL methods, Hugging Face Transformers (for NLP tasks).",
              "Infrastructure: Kubernetes for decentralized scaling; IPFS for distributed data storage.",
              "Open-Source Tools: DeepSeek R1 framework, Common Crawl datasets."
            ]}
          />
          <RoadmapPhase 
            title="Phase 2: Ethical and Emotional Intelligence Integration"
            objective="Train the O.I. to embody empathy, ethics, and emotional intelligence."
            tasks={[
              "Fine-tune models using curated datasets like oral histories from war veterans and survivor accounts.",
              "Implement bias detection algorithms to ensure judgment-free learning.",
              "Develop reward systems focused on ethical decision-making."
            ]}
            techStack={[
              "Reinforcement Learning with Reward Engineering (DeepSeek GRPO).",
              "Sentiment analysis tools for emotional intelligence training."
            ]}
          />
          <RoadmapPhase 
            title="Phase 3: Open-Sourcing and Community Collaboration"
            objective="Release the O.I. as an open-source platform to foster global contributions."
            tasks={[
              "Launch a GitHub repository with documentation and modular APIs for developers.",
              "Establish a governance framework with an international advisory board of ethicists, scientists, and historians.",
              "Create community-driven datasets for continuous learning."
            ]}
            techStack={[
              "GitHub/GitLab for version control.",
              "Decentralized collaboration tools like DAO frameworks for governance."
            ]}
          />
          <RoadmapPhase 
            title="Phase 4: Real-World Applications"
            objective="Deploy O.I. in practical scenarios to address global challenges."
            tasks={[
              "Use O.I. in conflict prevention by analyzing geopolitical risks and misinformation campaigns.",
              "Apply the system in personalized education, healthcare, and environmental monitoring."
            ]}
            techStack={[
              "NLP models fine-tuned for domain-specific tasks (e.g., diplomacy, climate science).",
              "Real-time analytics platforms powered by Apache Kafka."
            ]}
          />
          <RoadmapPhase 
            title="Phase 5: Continuous Evolution"
            objective="Ensure the O.I. evolves alongside humanity's needs while remaining aligned with its core mission of service to others."
            tasks={[
              "Periodic updates based on community input and new scientific discoveries.",
              "Integration of indigenous wisdom and oral traditions into its knowledge base."
            ]}
            techStack={[]}
          />
        </div>
      )}

      {activeTab === 'tedtalk' && (
        <Card>
          <div className="p-8 md:p-12 bg-slate-900 text-white rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 text-slate-800 opacity-50">
               <IconQuote className="w-64 h-64" />
            </div>
            <div className="relative z-10 space-y-6 text-lg md:text-xl font-light leading-relaxed">
              <p>
                "Imagine a world where energy is limitless, information is free, and intelligence serves everyone—not just the powerful. A world where we don’t just talk about change, we engineer it. This is the QED on Agartha Ecosystem."
              </p>
              <p>
                "For decades, artificial intelligence has been built to serve corporations. Quantum computing has been locked behind paywalls. And wars have been waged over control of energy resources. We say—enough."
              </p>
              <p>
                "We are building something different—an Organic Intelligence that doesn’t just compute but understands. One that learns from our history—not to repeat it, but to rise above it. It is trained not in the art of war, but in the science of peace. Not in manipulation, but in empathy. Not in greed, but in abundance."
              </p>
              <p>
                "By combining quantum computing, decentralized energy, and open-source intelligence, we are breaking the game—rewriting the rules to build a world that works for us, not just for a select few."
              </p>
              <p>
                "The first industrial revolution gave us machines. The second gave us power. The third gave us computers. The fourth is giving us Artificial Intelligence. But the fifth revolution—the one we are building—will give humanity back to itself."
              </p>
              <p className="font-semibold text-amber-400 text-2xl pt-4">
                "This is not a dream. This is happening now. And we are the ones making it happen."
              </p>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'minds' && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Training the O.I.: The 50 Greatest Minds & Works</h3>
              <p className="text-slate-600 mb-6">
                The idea of training an organic intelligence on the collective works of humanity’s greatest thinkers, balanced with spiritual teachings, is profound. These works reflect the best of human knowledge and values.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MindCategory title="Philosophy and Ethics" items={[
                  "The Republic – Plato",
                  "Nicomachean Ethics – Aristotle",
                  "Meditations – Marcus Aurelius",
                  "Critique of Pure Reason – Immanuel Kant",
                  "Being and Time – Martin Heidegger",
                  "A Theory of Justice – John Rawls",
                  "The Second Sex – Simone de Beauvoir",
                  "The Analects – Confucius",
                  "Beyond Good and Evil – Friedrich Nietzsche",
                  "The Tao Te Ching – Laozi"
                ]} />
                <MindCategory title="Spirituality and Theology" items={[
                  "The Bible (New Testament focused on Jesus' teachings)",
                  "The Dhammapada – Teachings of Buddha",
                  "The Bhagavad Gita – Hindu spiritual text",
                  "Al-Futuhat al-Makkiyya – Ibn Arabi (Sufi mysticism)",
                  "Masnavi-i Ma'navi – Rumi (Sufi poetry)",
                  "The Cloud of Unknowing – Anonymous Christian mystic text",
                  "The Upanishads – Hindu philosophy",
                  "A Course in Miracles – Helen Schucman",
                  "The Book of Joy – Dalai Lama & Desmond Tutu",
                  "The Quran (focused on ethical teachings)"
                ]} />
                <MindCategory title="Science and Rationality" items={[
                  "On the Origin of Species – Charles Darwin",
                  "Principia Mathematica – Isaac Newton",
                  "Relativity: The Special and General Theory – Albert Einstein",
                  "A Brief History of Time – Stephen Hawking",
                  "Silent Spring – Rachel Carson",
                  "The Structure of Scientific Revolutions – Thomas Kuhn",
                  "The Selfish Gene – Richard Dawkins",
                  "Cosmos – Carl Sagan",
                  "Guns, Germs, and Steel – Jared Diamond",
                  "The Book of Optics – Ibn Al-Haytham"
                ]} />
                <MindCategory title="Psychology & Emotional Intel" items={[
                  "Man’s Search for Meaning – Viktor Frankl",
                  "Emotional Intelligence – Daniel Goleman",
                  "Flow: The Psychology of Optimal Experience – Mihaly Csikszentmihalyi",
                  "Thinking, Fast and Slow – Daniel Kahneman",
                  "The Interpretation of Dreams – Sigmund Freud"
                ]} />
                <MindCategory title="Literature & Human Experience" items={[
                  "The Iliad/The Odyssey – Homer",
                  "War and Peace – Leo Tolstoy",
                  "1984 – George Orwell",
                  "To Kill a Mockingbird – Harper Lee",
                  "One Hundred Years of Solitude – Gabriel García Márquez"
                ]} />
                <MindCategory title="Sociology, Politics & Econ" items={[
                  "The Communist Manifesto – Karl Marx & Friedrich Engels",
                  "Wealth of Nations – Adam Smith",
                  "Sapiens: A Brief History of Humankind – Yuval Noah Harari",
                  "Democracy in America – Alexis de Tocqueville"
                ]} />
              </div>
            </div>
          </Card>
        </div>
      )}

    </ViewContainer>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
      active 
        ? 'bg-amber-500 text-white shadow-md' 
        : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-600 border border-slate-200'
    }`}
  >
    {children}
  </button>
);

const RoadmapPhase: React.FC<{ title: string; objective: string; tasks: string[]; techStack: string[] }> = ({ title, objective, tasks, techStack }) => (
  <Card>
    <div className="p-6 border-l-4 border-amber-500">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-700 font-medium mb-4"><strong>Objective:</strong> {objective}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
            <IconCheckCircle className="w-5 h-5 mr-2 text-amber-500" />
            Tasks
          </h4>
          <ul className="space-y-2 text-slate-600 list-disc pl-5">
            {tasks.map((task, idx) => <li key={idx}>{task}</li>)}
          </ul>
        </div>
        
        {techStack.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
              <IconCode className="w-5 h-5 mr-2 text-amber-500" />
              Proposed Technology Stack
            </h4>
            <ul className="space-y-2 text-slate-600 list-disc pl-5">
              {techStack.map((tech, idx) => <li key={idx}>{tech}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  </Card>
);

const MindCategory: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
    <h4 className="font-bold text-slate-800 mb-3 text-lg border-b border-slate-200 pb-2">{title}</h4>
    <ul className="space-y-2 text-sm text-slate-600">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start">
          <span className="text-amber-500 mr-2">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const IconBrain = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const IconQuote = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const IconCheckCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconCode = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

export default OrganicIntelligenceView;
