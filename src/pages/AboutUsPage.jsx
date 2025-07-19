// src/pages/AboutUsPage.js
import { Container, Box, Typography, Divider } from '@mui/material';
import logo from '../assets/images/flightgenius_icon2_transparente.png'; 

function AboutUsPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>

        {/* Logo da Empresa */}
        <Box sx={{ mb: 3 }}>
          <img src={logo} alt="FlightGenius Logo" style={{ maxWidth: '200px', width: '100%', height: 'auto' }} />
        </Box>
        
        {/* Título Principal */}
        <Typography variant="h3" component="h1" gutterBottom>
          Sobre Nós
        </Typography>

        {/* Parágrafo de Introdução */}
        <Typography variant="body1" paragraph>
          Bem-vindo à Flight Genius, seu parceiro dedicado para cotações de voos personalizadas e planejamento de viagens sem estresse. Acreditamos que encontrar voos acessíveis não deveria ser uma tarefa árdua, então nossa missão é simples: simplificar o processo de busca de voos e levá-lo do Ponto A ao Ponto B com tranquilidade — a um preço que faz você sorrir.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Nossa História */}
        <Typography variant="h5" component="h2" gutterBottom>
          Nossa História
        </Typography>
        <Typography variant="body1" paragraph>
          A Flight Genius foi fundada por um grupo de amigos que reconheceram como a indústria aérea pode ser avassaladora — desde preços flutuantes até taxas ocultas e termos confusos. Com base em nossa paixão por viagens e nossa experiência em hospitalidade, queríamos criar um serviço que lidasse com toda a complexidade nos bastidores, deixando você com um conjunto simples e selecionado de voos acessíveis e preços transparentes.
        </Typography>

        {/* Abordagem Personalizada */}
        <Typography variant="h5" component="h2" gutterBottom>
          Abordagem Personalizada
        </Typography>
        <Typography variant="body1" paragraph>
          Não acreditamos em soluções “tamanho único”. Cada viagem é única, assim como suas preferências. Por isso, nosso processo começa entendendo suas necessidades — destino, orçamento, datas de viagem, seleção de assentos, solicitações especiais. Em seguida, combinamos nosso conhecimento interno, tecnologia de busca poderosa e ofertas exclusivas para criar um conjunto personalizado de opções de voo. Em resumo, fazemos a pesquisa e a negociação para que você não precise.
        </Typography>

        {/* Experiência Sem Estresse */}
        <Typography variant="h5" component="h2" gutterBottom>
          Experiência Sem Estresse
        </Typography>
        <Typography variant="body1" paragraph>
          Nossa filosofia gira em torno de eliminar o estresse de todo o processo de planejamento de viagem. Pense em nós como seu concierge de voos dedicado — fornecendo suporte em tempo real, lidando com mudanças repentinas e garantindo que você nunca precise enfrentar o incômodo de comparar um milhão de classes de tarifas confusas. Nosso objetivo é tornar a reserva de um voo tão fácil quanto embarcar no avião.
        </Typography>

        {/* Preços Acessíveis */}
        <Typography variant="h5" component="h2" gutterBottom>
          Preços Acessíveis
        </Typography>
        <Typography variant="body1" paragraph>
          Entendemos que o custo é frequentemente o fator mais importante ao reservar uma viagem. Através de nossos relacionamentos com as principais companhias aéreas e redes de viagem, conseguimos garantir preços altamente competitivos e repassar essas economias para você. Além disso, acreditamos em preços transparentes — sem taxas ocultas ou cobranças inesperadas.
        </Typography>

        {/* Nossa Promessa */}
        <Typography variant="h5" component="h2" gutterBottom>
          Nossa Promessa
        </Typography>
        <Typography variant="body1" paragraph>
          <ul>
            <li>
              <strong>Cotações Personalizadas:</strong> Cada cotação é adaptada ao seu destino, orçamento e cronograma — sem listas de voos genéricas.
            </li>
            <li>
              <strong>Suporte Dedicado:</strong> Nossos agentes estão disponíveis 24 horas por dia para ajudar com quaisquer mudanças ou dúvidas.
            </li>
            <li>
              <strong>Insights de Especialistas:</strong> Combinamos expertise da indústria e tecnologia avançada para garantir as melhores tarifas possíveis.
            </li>
            <li>
              <strong>Transparência Completa:</strong> Somos claros sobre todos os custos, para que você nunca veja taxas ocultas aparecerem no checkout.
            </li>
          </ul>
        </Typography>

        {/* Por Que Começamos */}
        <Typography variant="h5" component="h2" gutterBottom>
          Por Que Começamos
        </Typography>
        <Typography variant="body1" paragraph>
          Iniciamos essa jornada porque acreditamos que viajar deve ser emocionante, não assustador. Focando exclusivamente em soluções de voos, podemos concentrar todos os nossos recursos em encontrar o voo certo pelo preço certo. Seja planejando uma escapada de fim de semana, uma viagem de negócios ou uma reunião familiar, cuidamos dos detalhes para que você possa se concentrar em aproveitar a jornada.
        </Typography>

        {/* Chamada para Ação */}
        <Typography variant="body1" paragraph>
          Pronto para começar sua busca por voos sem estresse? <strong>Solicite uma cotação personalizada</strong> hoje e descubra como viajar de avião pode ser simples e agradável.
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutUsPage;
