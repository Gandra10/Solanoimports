import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Hero Section About */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase mb-8 leading-tight italic">
              PAIXÃO PELO <br />
              <span className="underline decoration-white/20">JOGO.</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              A Solano Imports nasceu em Cuiabá com um objetivo claro: elevar o nível do futebol brasileiro através de equipamentos de alta performance. Não vendemos apenas chuteiras; entregamos a ferramenta para que cada jogador alcance seu potencial máximo.
            </p>
            <div className="flex flex-col gap-4 text-white/50 font-medium">
              <p>✓ Especialistas em tecnologias de tração e conforto.</p>
              <p>✓ Curadoria das maiores marcas do mundo.</p>
              <p>✓ Compromisso total com a originalidade.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200" 
                alt="Solano Imports History" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 glass p-8 rounded-2xl hidden md:block border border-white/20">
              <span className="text-4xl font-display font-black block">100%</span>
              <span className="text-xs uppercase tracking-widest font-bold text-white/50">Original Garantido</span>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { 
              icon: <Target className="w-8 h-8" />, 
              title: "Missão", 
              desc: "Proporcionar aos atletas o acesso às melhores tecnologias esportivas mundiais com atendimento personalizado." 
            },
            { 
              icon: <Eye className="w-8 h-8" />, 
              title: "Visão", 
              desc: "Ser a principal referência nacional no nicho de chuteiras profissionais até 2028." 
            },
            { 
              icon: <ShieldCheck className="w-8 h-8" />, 
              title: "Valores", 
              desc: "Integridade, excelência técnica, velocidade na entrega e foco total no desempenho do cliente." 
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-3xl border border-white/5 hover:border-white/20 transition-all"
            >
              <div className="mb-6 text-white">{item.icon}</div>
              <h3 className="text-2xl font-display font-black uppercase mb-4 italic">{item.title}</h3>
              <p className="text-white/60 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Team / Focus */}
        <div className="glass p-12 rounded-3xl overflow-hidden relative">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-display font-black uppercase mb-6 italic">Especialistas de Campo</h2>
            <p className="text-white/70 text-lg mb-8">
              Nossa equipe é formada por quem entende de futebol. Analisamos cada modelo por peso, material do cabedal e tipo de trava, garantindo que você receba a chuteira perfeita para o seu estilo de jogo.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-primary bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <Users className="w-6 h-6 text-white/30" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-bold text-white/50 uppercase tracking-widest">+5.000 Atletas Atendidos</span>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
