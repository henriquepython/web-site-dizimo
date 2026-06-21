import React, { useState, useEffect } from 'react';
import { 
  Church, 
  Heart, 
  BookOpen, 
  Users, 
  ChevronDown, 
  CheckCircle, 
  DollarSign, 
  Compass, 
  Award, 
  Phone, 
  MapPin, 
  Mail, 
  MessageSquare,
  Gift,
  ArrowRight,
  Sparkles,
  Info,
  Menu,
  X,
  Instagram
} from 'lucide-react';

// Structuring Bible Reflections
interface Scripture {
  text: string;
  reference: string;
  category: string;
}

const BIBLE_REFLECTIONS: Scripture[] = [
  {
    text: "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria.",
    reference: "2 Coríntios 9:7",
    category: "Generosidade"
  },
  {
    text: "Aquele que semeia pouco, pouco colherá; aquele que semeia com abundância, com abundância colherá.",
    reference: "2 Coríntios 9:6",
    category: "Generosidade"
  },
  {
    text: "Dai, e ser-vos-á dado; boa medida, recalcada, sacudida e transbordando, vos deitarão no vosso regaço; porque com a mesma medida com que medirdes também vos medirão a vós.",
    reference: "Lucas 6:38",
    category: "Fraternidade"
  },
  {
    text: "Há maior felicidade em dar do que em receber.",
    reference: "Atos 20:35",
    category: "Partilha"
  },
  {
    text: "Trazei todos os dízimos à casa do tesouro, para que haja mantimento na minha casa, e depois fazei prova de mim nisto, diz o Senhor dos Exércitos, se eu não vos abrir as janelas do céu, e não derramar sobre vós uma bênção tal até que não haja lugar suficiente para a recolherdes.",
    reference: "Malaquias 3:10",
    category: "Aliança"
  },
  {
    text: "Todos os dízimos da terra, quer dos cereais, quer dos frutos das árvores, pertencem ao Senhor; são coisa consagrada ao Senhor.",
    reference: "Levítico 27:30",
    category: "Consagração"
  },
  {
    text: "Honra ao Senhor com os teus bens, e com as primícias de toda a tua renda; e se encherão os teus celeiros abundantemente, e transbordarão de mosto os teus lagares.",
    reference: "Provérbios 3:9-10",
    category: "Providência"
  },
  {
    text: "Não aparecereis diante do Senhor de mãos vazias. Cada um oferecerá o que puder, conforme a bênção que o Senhor teu Deus te tiver concedido.",
    reference: "Deuteronômio 16:16-17",
    category: "Oferta"
  },
  {
    text: "Quem é generoso será abençoado, porque reparte o seu pão com o pobre.",
    reference: "Provérbios 22:9",
    category: "Generosidade"
  },
  {
    text: "Quem dá aos pobres não passará necessidade.",
    reference: "Provérbios 28:27",
    category: "Caridade"
  },
  {
    text: "Não esqueçais a beneficência e a solidariedade, porque são esses os sacrifícios que agradam a Deus.",
    reference: "Hebreus 13:16",
    category: "Solidariedade"
  },
  {
    text: "Todos os fiéis viviam unidos e tinham tudo em comum; vendiam suas propriedades e bens e repartiam o dinheiro entre todos, conforme a necessidade de cada um.",
    reference: "Atos 2:44-45",
    category: "Comunidade"
  },
  {
    text: "Repartia-se a cada um conforme sua necessidade.",
    reference: "Atos 4:35",
    category: "Fraternidade"
  },
  {
    text: "Jesus observava como a multidão depositava moedas no tesouro do templo. Uma pobre viúva colocou duas pequenas moedas. Então disse: esta pobre viúva deu mais do que todos.",
    reference: "Marcos 12:41-44",
    category: "Entrega"
  },
  {
    text: "Vendei os vossos bens e dai esmola. Fazei para vós bolsas que não envelheçam, um tesouro inesgotável nos céus.",
    reference: "Lucas 12:33",
    category: "Desapego"
  },
  {
    text: "Dá esmola de teus bens e não desvies o rosto de nenhum pobre.",
    reference: "Tobias 4:7",
    category: "Caridade"
  },
  {
    text: "A oração acompanhada de jejum é boa, mas melhor ainda é a esmola acompanhada de justiça.",
    reference: "Tobias 12:8",
    category: "Justiça"
  }
];

const KEY_PIX = '16260762005207';

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [navbarScrolled, setNavbarScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Helper to click link and auto-close mobile drawer
  const handleNavLinkClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  // Reflections State
  const [reflectionIndex, setReflectionIndex] = useState<number>(0);
  const [fadeReflection, setFadeReflection] = useState<boolean>(true);

  // FAQ Active State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Floating notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Track scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show customized floating toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Safe reflection cycle with aesthetic fade out-in transition effect
  const cycleReflection = () => {
    setFadeReflection(false);
    setTimeout(() => {
      setReflectionIndex((prev) => (prev + 1) % BIBLE_REFLECTIONS.length);
      setFadeReflection(true);
    }, 250);
  };

  // Safe FAQ Toggle
  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const currentReflection = BIBLE_REFLECTIONS[reflectionIndex];

  return (
    <>
      {/* Dynamic Animated Status Toast */}
      {toastMessage && (
        <div id="status-toast" className="toast-success">
          <CheckCircle size={20} color="var(--color-primary)" />
          <span style={{ fontWeight: 500, fontSize: '0.92rem' }}>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <a href="#inicio" className="navbar-logo" onClick={() => handleNavLinkClick('inicio')}>
            <div className="navbar-logo-icon">
              <Church size={20} />
            </div>
            <span>Paróquia <span style={{ color: 'var(--color-primary)' }}>São João Paulo II</span></span>
          </a>

          {/* Mobile Hamburguer Toggle Button */}
          <button 
            className="mobile-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav>
            <ul className={`nav-links ${isMobileMenuOpen ? 'is-open' : ''}`}>
              <li>
                <a 
                  href="#inicio" 
                  className={`nav-link ${activeTab === 'inicio' ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick('inicio')}
                >
                  Início
                </a>
              </li>
              <li>
                <a 
                  href="#teologia" 
                  className={`nav-link ${activeTab === 'teologia' ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick('teologia')}
                >
                  Teologia
                </a>
              </li>
              <li>
                <a 
                  href="#impacto" 
                  className={`nav-link ${activeTab === 'impacto' ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick('impacto')}
                >
                  Impacto
                </a>
              </li>
              <li>
                <a 
                  href="#como-contribuir" 
                  className="nav-btn"
                  onClick={() => handleNavLinkClick('como-contribuir')}
                >
                  Como Contribuir
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero">
        <img 
          src="/src/assets/images/sanctuary_church_hero_1782049117535.jpg" 
          alt="Majestic Sanctuary Church Interior" 
          className="hero-bg-img"
          referrerPolicy="no-referrer"
        />
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-subtitle">Pastoral do Dízimo • Paróquia São João Paulo II</span>
            <h1 className="hero-title">Partilhar é um Gesto de Profunda Fé</h1>
            <p className="hero-desc">
              O dízimo não é imposto nem dever burocrático; é a devolução generosa de quem reconhece as bênçãos diárias e ama a sua comunidade paroquial ativa.
            </p>
            <div className="hero-buttons">
              <a href="#como-contribuir" className="btn-primary" onClick={() => handleNavLinkClick('como-contribuir')}>
                <Award size={18} />
                Como Contribuir
              </a>
              <a href="#impacto" className="btn-secondary" onClick={() => handleNavLinkClick('impacto')}>
                <Heart size={18} />
                Ver Impacto Social
              </a>
            </div>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => {
          const section = document.getElementById('teologia');
          section?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <span>Desvendar Mais</span>
        </div>
      </section>

      {/* Theological Reflections Section */}
      <section id="teologia" className="reflection-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="badge">Palavra Eucarística</span>
            <h2>Reflexões Sobre a Gratidão e o Dízimo</h2>
            <p className="section-desc">
              O sustento da nossa comunidade é mantido com corações caridosos e conscientes de sua missão de fé.
            </p>
          </div>

          <div className="reflection-card" style={{ opacity: fadeReflection ? 1 : 0.4 }}>
            <span className="reflection-theme-badge">
              Tema: {currentReflection.category}
            </span>
            <blockquote className="reflection-quote">
              {currentReflection.text}
            </blockquote>
            <div className="reflection-author">
              {currentReflection.reference}
            </div>
            <div className="reflection-bible">Escrituras do Antigo & Novo Testamento</div>
          </div>
          
          <button onClick={cycleReflection} className="reflection-cycle-btn">
            <Sparkles size={16} />
            Próxima Leitura de Fé
          </button>

          {/* Interactive Pillars - Animated Grid */}
          <div style={{ marginTop: '5rem' }}>
            <span className="badge">As Quatro Dimensões Fundamentais</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-secondary)' }}>
              Onde meu Dízimo Atua Diretamente?
            </h3>
            <p style={{ maxWidth: '650px', margin: '0.5rem auto 3rem auto' }}>
              A Igreja Católica divide o dízimo em quatro grandes vertentes vitais. Cada uma possui relevância única para que o evangelho atinja mais famílias.
            </p>

            <div className="dimensions-grid">
              {/* Dimensão Religiosa */}
              <div className="dimension-card">
                <div className="dimension-icon">
                  <Church size={24} />
                </div>
                <h4 className="dimension-title">Dimensão Religiosa</h4>
                <p className="dimension-desc">
                  Destina-se ao culto sagrado, alfaias, hóstias puras, vinho canônico, alfaias, folhetos das missas e manutenção estrutural física do Santuário.
                </p>
              </div>

              {/* Dimensão Social */}
              <div className="dimension-card">
                <div className="dimension-icon">
                  <Heart size={24} />
                </div>
                <h4 className="dimension-title">Dimensão Social</h4>
                <p className="dimension-desc">
                  Ampara diretamente irmãos necessitados. Subsidia o dispensário de remédios, doações de cestas e projetos de requalificação social paroquial.
                </p>
              </div>

              {/* Dimensão Missionária */}
              <div className="dimension-card">
                <div className="dimension-icon">
                  <Compass size={24} />
                </div>
                <h4 className="dimension-title">Dimensão Missionária</h4>
                <p className="dimension-desc">
                  Financia o envio de missionários, formação de novos catequistas, materiais didáticos infantis e suporte financeiro à comunidades carentes vizinhas.
                </p>
              </div>

              {/* Dimensão Eclesial */}
              <div className="dimension-card">
                <div className="dimension-icon">
                  <Users size={24} />
                </div>
                <h4 className="dimension-title">Dimensão Eclesial</h4>
                <p className="dimension-desc">
                  Fortalece a coesão da Diocese. Apoia seminaristas em formação sacerdotal, encontros formativos de casais e manutenção de encontros juvenis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informative Impact Section */}
      <section id="impacto" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div className="section-title-wrap text-center">
            <span className="badge">Transparência & Zelo Pastoral</span>
            <h2>A Gestão Responsável das Contribuições</h2>
            <p className="section-desc">
              Cada devolução e gesto consciente de partilha é administrado com rigor, integridade e fidelidade, transformando amor espiritual em sementes vivas de acolhimento.
            </p>
          </div>

          <div className="impact-showcase-grid" style={{ marginTop: '2.5rem' }}>
            <div className="impact-achieve-card">
              <div style={{ color: 'var(--color-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Church size={28} />
              </div>
              <h4 className="impact-achieve-title">Conselhos de Administração</h4>
              <p className="impact-achieve-desc">
                Os recursos são geridos sob a supervisão do Conselho paroquial de assuntos econômicos e em estrita comunhão com as diretrizes administrativas da nossa diocese.
              </p>
            </div>

            <div className="impact-achieve-card">
              <div style={{ color: 'var(--color-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={28} />
              </div>
              <h4 className="impact-achieve-title">Amparo e Promoção Humana</h4>
              <p className="impact-achieve-desc">
                Sustenta as pastorais sociais e caritativas em suas visitas, apoio e acolhimento espiritual direto àqueles em situação de vulnerabilidade e aos que mais sofrem.
              </p>
            </div>

            <div className="impact-achieve-card">
              <div style={{ color: 'var(--color-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={28} />
              </div>
              <h4 className="impact-achieve-title">Liturgia e Evangelização</h4>
              <p className="impact-achieve-desc">
                Garante a dignidade do altar, a beleza das celebrações dos sacramentos e a formação constante das nossas crianças e jovens na catequese e no crisma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pastoral Stewardship Information Panel */}
      <section style={{ backgroundColor: 'var(--color-bg-card)' }}>
        <div className="container">
          <div className="action-showcase">
            <div className="action-media">
              <img 
                src="/src/assets/images/parish_community_action_1782049134625.jpg" 
                alt="Ação da comunidade paroquial e partilha" 
                referrerPolicy="no-referrer"
              />
              <div className="action-media-overlay">
                <div className="action-media-title">Nossa Paróquia em Comunhão</div>
              </div>
            </div>

            <div className="action-info">
              <span className="badge">Nossa Prática e Compromisso</span>
              <h2 style={{ fontSize: '2rem' }}>O Sentido Comunitário do Dízimo</h2>
              <p>
                O dízimo não deve ser visto como uma contribuição fria, mas como um testemunho afetivo e efetivo de pertença à Igreja. Trata-se da livre expressão de nossa corresponsabilidade pastoral.
              </p>

              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)', flexShrink: 0 }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, color: 'var(--color-secondary)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>O Sustento das Pastorais</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', margin: 0 }}>Garante que todas as atividades pastorais de oração, atendimento espiritual e formação contínua permaneçam de portas abertas.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)', flexShrink: 0 }}>
                    <Compass size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, color: 'var(--color-secondary)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Dimensão Missionária Permanente</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', margin: 0 }}>Unidade e dedicação para viabilizar folhetos litúrgicos, apoio catequético e acolhimento fraternal nas missões e comunidades filiadas.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)', flexShrink: 0 }}>
                    <Info size={20} />
                  </div>
                 <div>
                  <h4 style={{ fontWeight: 600, color: 'var(--color-secondary)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    Transparência e Confiança
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', margin: 0 }}>
                    Valorizamos a transparência na administração dos recursos, oferecendo informações claras e acessíveis para fortalecer a confiança e o engajamento da comunidade.
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Contribute Informative Section */}
      <section id="como-contribuir" style={{ backgroundColor: 'var(--color-bg-light)', paddingBottom: '6rem' }}>
        <div className="container">
          <div className="section-title-wrap text-center">
            <span className="badge">Como Participar</span>
            <h2>Canais de Contribuição do Dízimo</h2>
            <p className="section-desc">
              Escolha a forma que melhor se adapta à sua conveniência diária. Toda devolução é acolhida com profunda gratidão e oração sacerdotal comunitária.
            </p>
          </div>

          <div className="contribute-container">
            <div className="contribute-card">
              <div>
                <div className="contribute-header">
                  <div className="contribute-icon-wrapper">
                    <CheckCircle size={22} />
                  </div>
                  <h3 className="contribute-title">Chave Pix Oficial</h3>
                </div>
                <div className="contribute-body">
                  <p>Partilhe de forma instantânea sem taxas bancárias. Clique no botão ao lado para copiar a chave Pix oficial do dízimo paroquial.</p>
                </div>
              </div>
              <div className="pix-copy-box">
                {/* <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>16260762005207</span> */}
                <button 
                  className="btn-copy"
                  onClick={() => {
                    navigator.clipboard.writeText(KEY_PIX);
                    triggerToast('Chave Pix oficial copiada para a área de transferência!');
                  }}
                >
                  Copiar Chave
                </button>
              </div>
            </div>

            <div className="contribute-card">
            <div>
              <div className="contribute-header">
                <div className="contribute-icon-wrapper">
                  <Gift size={22} />
                </div>
                <h3 className="contribute-title">Contribuição Durante a Missa</h3>
              </div>
              <div className="contribute-body">
                <p>
                  Sua contribuição pode ser realizada presencialmente durante as celebrações, diretamente na mesa da Pastoral do Dízimo.
                </p>
                <p style={{ fontSize: '0.88rem' }}>
                  Caso precise de orientação, procure os agentes da acolhida na entrada ou ao final da missa. Eles terão alegria em indicar a localização da Pastoral do Dízimo e esclarecer eventuais dúvidas.
                </p>
              </div>
            </div>
          </div>

          <div className="contribute-card">
            <div>
              <div className="contribute-header">
                <div className="contribute-icon-wrapper">
                  <BookOpen size={22} />
                </div>
                <h3 className="contribute-title">Cadastro e Informações</h3>
              </div>
              <div className="contribute-body">
                <p>
                  A Pastoral do Dízimo está disponível para acolher novos dizimistas, atualizar cadastros e fornecer informações sobre as formas de contribuição.
                </p>
                <p style={{ fontSize: '0.88rem' }}>
                  Para atendimento, procure a mesa da pastoral durante as missas ou solicite auxílio aos agentes da acolhida, que poderão direcioná-lo adequadamente.
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section style={{ backgroundColor: 'var(--color-bg-card)' }}>
        <div className="container">
          <div className="section-title-wrap text-center">
            <span className="badge">Perguntas Frequentes</span>
            <h2>Esclareça Suas Dúvidas Sobre o Dízimo</h2>
            <p className="section-desc">
              Compreenda a beleza bíblica e eclesial de pertencer a esta rede permanente de apoio e amor fraterno.
            </p>
          </div>

          <div className="faq-container">
            {[
              {
                q: "Qual é a real diferença teológica entre Dízimo e Oferta?",
                a: "O dízimo é um compromisso contínuo, mensal e sistêmico que o fiel assume com Deus e sua paróquia para garantir as estruturas essenciais básicas e pastorais. A oferta, por outro lado, é um gesto inteiramente espontâneo, circunstancial e sem periodicidade imposta, depositado livremente no momento das coletas litúrgicas ou campanhas caritativas específicas."
              },
              {
                q: "Eu preciso dar exatamente 10% do meu salário bruto?",
                a: "Na Igreja Católica, o dízimo não tem caráter de obrigação tarifária ou jurídica exata sobre 10%. Incentivamos que toda contribuição seja, sobretudo, proporcional ao sustento da sua própria família e, primordialmente, originada de um coração feliz. É um retorno grato conforme as suas próprias reais possibilidades orçamentárias."
              },
              {
                q: "Como posso repassar a minha contribuição?",
                a: "Você pode repassar o dízimo de forma inteiramente voluntária utilizando nossa chave Pix oficial, durante as missas na mesa da pastoral do dízimo ou visitando presencialmente a secretaria da paróquia."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
              >
                <button 
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={activeFaq === idx}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className="faq-icon" />
                </button>
                <div className="faq-answer">
                  <p style={{ margin: 0 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <div className="footer-logo">
                <div className="footer-logo-circle">
                  <Church size={16} />
                </div>
                <span>Paróquia São João Paulo II</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', margin: 0 }}>
                Arquidiocese Feira de Santana
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                <MapPin size={14} color="var(--color-primary)" />
                <span>Rua O, S/N - CONJ. JOÃO PAULO II - CEP: 44034-470 - FEIRA DE SANTANA - BA
                  
                </span>
              </div>
            </div>

            <div>
              <h4 className="footer-heading">Opções</h4>
              <ul className="footer-links">
                <li><a href="#teologia" className="footer-link">Dimensões do Dízimo</a></li>
                <li><a href="#impacto" className="footer-link">Prestação de Contas & Impacto</a></li>
                <li><a href="#como-contribuir" className="footer-link">Canais de Contribuição</a></li>
                <li><a href="#inicio" className="footer-link">Início do Portal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Contacto de Fé</h4>
              <ul className="footer-links" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} /> (75) 3021-3955
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <a href="https://www.instagram.com/paroquiasaojoaopaulo2/" >
                    <Instagram size={14} /> Instagram da Paróquia
                  </a>
                </li>
                {/* <li style={{ marginTop: '1rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  Pix do Dízimo Oficial:
                  <span style={{ display: 'block', wordBreak: 'break-all', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'white', marginTop: '4px' }}>
                    {KEY_PIX}
                  </span>
                </li> */}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Paróquia São João Paulo II - Feira de Santana - BA. Todos os direitos reservados. Pastoral da Caridade e Dízimo eclesial voluntário.</span>
            {/* <div className="social-links">
              <a href="https://www.instagram.com/paroquiasaojoaopaulo2/" className="social-btn"><Instagram size={16} /></a>
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
}
