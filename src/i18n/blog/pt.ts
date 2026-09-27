/**
 * Blog translations — BRAZILIAN PORTUGUESE.
 * bodyHtml mirrors the English MDX article structure (h2/p/table/a).
 */
import type { BlogTable } from '../blog-content';

export const ptBlog: BlogTable = {
  'hybrid-vs-grid-tie-vs-off-grid': {
    title: 'Híbrido vs Grid-Tie vs Off-Grid: Qual Topologia de Inversor se Encaixa no Seu Projeto?',
    description:
      'Uma comparação prática das três topologias de inversores para projetos solares — o que cada uma faz, quanto custam e como escolher a certa para o seu mercado.',
    tags: ['Guia de Inversores', 'Noções Básicas de Energia Solar'],
    bodyHtml: `<p>Escolher a topologia do inversor é a primeira e mais consequente decisão em qualquer projeto solar. Este guia compara as três topologias principais e as relaciona com cenários reais de projeto que vemos junto a compradores B2B.</p>
<h2>Comparação rápida</h2>
<table>
<thead>
<tr><th></th><th>Grid-tie</th><th>Off-grid</th><th>Híbrido</th></tr>
</thead>
<tbody>
<tr><td>Injeção de excedente na rede</td><td>Sim</td><td>Não</td><td>Configurável</td></tr>
<tr><td>Suporte a bateria</td><td>Não</td><td>Sim</td><td>Sim</td></tr>
<tr><td>Funciona durante queda de energia</td><td>Não</td><td>Sim</td><td>Sim (&lt; 10 ms)</td></tr>
<tr><td>Uso típico</td><td>Redução da conta</td><td>Sem rede disponível</td><td>Armazenamento + backup</td></tr>
<tr><td>Custo relativo</td><td>Mais baixo</td><td>Médio</td><td>Mais alto</td></tr>
</tbody>
</table>
<h2>Grid-tie: maximize o retorno sobre uma rede existente</h2>
<p>Os inversores grid-tie convertem CC em CA e injetam o excedente de energia na rede. São os mais baratos por watt e os mais eficientes, mas as normas exigem que desliguem durante quedas de energia — sem energia de backup.</p>
<p><strong>Melhor para:</strong> mercados com medição líquida (net metering) ou tarifas de injeção na rede, e clientes cujo objetivo é puramente econômico.</p>
<h2>Off-grid: energia onde a rede não chega</h2>
<p>Os inversores off-grid formam a sua própria microrrede a partir da energia fotovoltaica e da bateria, frequentemente com entrada de gerador como backup. O rigor no dimensionamento é essencial: é preciso cobrir o pior mês, e não o mês médio.</p>
<p><strong>Melhor para:</strong> eletrificação rural, sites de telecomunicações, ilhas e casas de campo.</p>
<h2>Híbrido: o meio-termo que mais cresce</h2>
<p>Os inversores híbridos combinam um inversor grid-tie com um carregador de bateria. Eles injetam energia na rede quando compensa, carregam quando está barato e dão backup à residência quando a rede cai — tudo em um único equipamento.</p>
<p><strong>Melhor para:</strong> mercados com frequência crescente de blecautes, tarifas por horário de uso ou incentivos ao autoconsumo. Este é o segmento que mais cresce na maioria das regiões que atendemos.</p>
<h2>Como ajudamos compradores B2B a decidir</h2>
<p>Compartilhe o seu mercado de destino e o perfil típico dos seus projetos com os nossos engenheiros de vendas — recomendaremos a combinação certa de topologias para o seu catálogo, junto com os requisitos de certificação do seu país de destino. Comece pelo <a href="/pt/contact/">formulário de consulta</a>.</p>`,
  },
  'how-to-size-a-hybrid-solar-system': {
    title: 'Como Dimensionar um Sistema Solar Híbrido: Um Guia Passo a Passo',
    description:
      'Dimensionar um sistema solar híbrido com armazenamento em cinco etapas: auditoria de cargas, arranjo fotovoltaico, banco de baterias, potência do inversor e verificação de conformidade — com exemplos práticos.',
    tags: ['Guia de Dimensionamento', 'Sistemas Híbridos'],
    bodyHtml: `<p>O dimensionamento correto é o que separa um sistema híbrido que encanta o cliente de um que o decepciona. Este é o método de cinco etapas que os nossos engenheiros utilizam e que você pode aplicar diretamente aos projetos dos seus clientes.</p>
<h2>Etapa 1: Audite as cargas</h2>
<p>Liste cada carga com a sua potência e as horas de uso diárias. O resultado é um orçamento diário de energia em kWh. Não chute — um datalogger ou as contas de luz do cliente superam qualquer estimativa.</p>
<p><strong>Exemplo:</strong> uma residência que consome 12 kWh/dia com pico noturno de 6 kW.</p>
<h2>Etapa 2: Dimensione o arranjo fotovoltaico</h2>
<p>Divida o orçamento diário pelas horas de sol pleno locais e acrescente 15–25% para perdas do sistema, rendimento do ciclo da bateria e degradação dos painéis.</p>
<p><strong>Exemplo:</strong> 12 kWh ÷ 4.5 horas de sol × 1.25 ≈ 3.3 kW → um arranjo de 4 kW (8 painéis de 500 W) deixa margem.</p>
<h2>Etapa 3: Dimensione o banco de baterias</h2>
<p>Defina o objetivo do backup: apenas as cargas essenciais (geladeira, iluminação, roteador) ou a residência inteira. Multiplique pelas horas (ou dias) de autonomia necessários e respeite a corrente máxima de carga do inversor — um banco de baterias pequeno demais para absorver a produção fotovoltaica desperdiça geração.</p>
<p><strong>Exemplo:</strong> 8 kWh de armazenamento (48 V × ~170 Ah úteis) cobrem as cargas essenciais durante a noite com um dia de autonomia.</p>
<h2>Etapa 4: Selecione o inversor</h2>
<p>A potência contínua do inversor deve superar o pico simultâneo de carga, e a sua potência de surto deve cobrir as partidas de motores. Um equipamento de 5 kW contínuos / 10 kW de surto — veja o nosso <a href="/pt/products/">catálogo de inversores</a> — lida tranquilamente com um pico noturno de 6 kW distribuído entre cargas não coincidentes, com margem para a corrente de partida.</p>
<h2>Etapa 5: Verifique a conformidade</h2>
<p>Confirme os códigos de rede, os limites de injeção e os requisitos de certificação do mercado de destino antes de cotar. É aqui que o suporte OEM se paga — pré-configuramos firmware específico para cada mercado na linha de produção.</p>
<h2>Precisa de uma revisão?</h2>
<p>Envie-nos a sua auditoria de cargas e o mercado de destino pelo <a href="/pt/contact/">formulário de contato</a> — os nossos engenheiros revisarão o seu dimensionamento e recomendarão modelos adequados gratuitamente.</p>`,
  },
};
