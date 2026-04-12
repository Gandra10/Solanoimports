import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, RefreshCw, Lock } from 'lucide-react';

const Policies = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase mb-4 italic">Políticas da Loja</h1>
          <p className="text-white/50">Transparência e segurança em cada passo da sua compra.</p>
        </motion.div>

        <div className="space-y-12">
          {/* Exchanges & Returns */}
          <section className="glass p-8 md:p-12 rounded-3xl border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <RefreshCw className="text-white" />
              </div>
              <h2 className="text-2xl font-display font-black uppercase italic">Trocas e Devoluções</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed font-medium">
              <p>• A primeira troca é totalmente grátis em até 7 dias após o recebimento.</p>
              <p>• O produto deve estar sem sinais de uso, em sua embalagem original e com todas as etiquetas fixadas.</p>
              <p>• Defeitos de fabricação têm garantia de 90 dias conforme o CDC.</p>
              <p>• Reembolsos são processados em até 5 dias úteis após o recebimento do item em nosso centro de distribuição.</p>
            </div>
          </section>

          {/* Shipping */}
          <section className="glass p-8 md:p-12 rounded-3xl border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <Truck className="text-white" />
              </div>
              <h2 className="text-2xl font-display font-black uppercase italic">Envio e Entrega</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed font-medium">
              <p>• Enviamos para todo o Brasil via Correios ou Transportadora Jadlog.</p>
              <p>• O prazo de postagem é de até 48 horas úteis após a confirmação do pagamento.</p>
              <p>• O código de rastreio é enviado automaticamente para seu e-mail e WhatsApp.</p>
              <p>• Frete grátis para todo o Brasil em compras acima de R$ 500,00.</p>
            </div>
          </section>

          {/* Privacy */}
          <section className="glass p-8 md:p-12 rounded-3xl border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <Lock className="text-white" />
              </div>
              <h2 className="text-2xl font-display font-black uppercase italic">Privacidade e Segurança</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed font-medium">
              <p>• Seus dados estão 100% seguros através de criptografia SSL de 256 bits.</p>
              <p>• Não armazenamos dados de cartão de crédito. Todo o processamento é feito por gateways certificados (Mercado Pago/Appmax).</p>
              <p>• Seus dados cadastrais jamais são compartilhados com terceiros.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Policies;
