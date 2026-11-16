
        // =====================================================================
        // CONFIGURAÇÃO DA API DE INTELIGÊNCIA ARTIFICIAL (TOKEN VAZIO POR PADRÃO)
        // =====================================================================
        let AI_API_TOKEN = ""; // <-- Espaço reservado para o token da IA (deixado vazio intencionalmente)
        let AI_PROVIDER = "gemini"; // "gemini" ou "openai"

        // Banco de 24 Questões Psicométricas (Baseadas no ECR-R e 5 Facetas MBTI)
        // Cada pergunta pontua nos eixos principais (anxiety, avoidance) e em uma faceta específica (trait)
        // dir: +1 significa que concordar aumenta o índice; -1 significa item reverso (concordar diminui o índice)
        const questions = [
            // ETAPA 1: Intimidade & Vulnerabilidade
            {
                stage: "Etapa 1 de 4: Intimidade & Proximidade",
                dimension: "Intimidade e Vulnerabilidade",
                text: "Sinto desconforto quando alguém tenta se aproximar emocionalmente demais de mim em pouco tempo.",
                anxiety: 0, avoidance: 1.0, trait: "vulnerability", traitDir: 1 // + = Autoproteção/Distanciamento
            },
            {
                stage: "Etapa 1 de 4: Intimidade & Proximidade",
                dimension: "Regulação Emocional",
                text: "Quando estou angustiado(a), minha primeira reação é buscar colo, conversa ou validação de quem eu amo.",
                anxiety: 0.85, avoidance: -0.6, trait: "regulation", traitDir: 1 // + = Co-regulação / Busca por outro
            },
            {
                stage: "Etapa 1 de 4: Intimidade & Proximidade",
                dimension: "Intimidade e Vulnerabilidade",
                text: "Acho relativamente fácil compartilhar meus medos mais profundos e inseguranças com um parceiro.",
                anxiety: -0.3, avoidance: -1.0, trait: "vulnerability", traitDir: -1 // - = Abertura Emocional
            },
            {
                stage: "Etapa 1 de 4: Intimidade & Proximidade",
                dimension: "Visão de Si e do Outro",
                text: "Frequentemente me preocupo com a possibilidade de que as pessoas que amo não gostem de mim tanto quanto eu gosto delas.",
                anxiety: 1.0, avoidance: 0, trait: "trust", traitDir: 1 // + = Hipervigilância
            },
            {
                stage: "Etapa 1 de 4: Intimidade & Proximidade",
                dimension: "Autonomia vs. Fusão",
                text: "Para mim, depender emocionalmente de outra pessoa é arriscado; prefiro contar apenas comigo mesmo(a).",
                anxiety: 0.2, avoidance: 1.0, trait: "autonomy", traitDir: -1 // - = Independência Estrita
            },
            {
                stage: "Etapa 1 de 4: Intimidade & Proximidade",
                dimension: "Autonomia vs. Fusão",
                text: "Meu ideal de relacionamento envolve estar profundamente conectado(a) e compartilhar quase tudo da rotina.",
                anxiety: 0.7, avoidance: -0.8, trait: "autonomy", traitDir: 1 // + = Hiperconexão/Fusão
            },

            // ETAPA 2: Comunicação, Sinais & Medo do Abandono
            {
                stage: "Etapa 2 de 4: Sinais & Segurança Afetiva",
                dimension: "Visão de Si e do Outro",
                text: "Se meu parceiro demora horas para responder uma mensagem sem avisar, minha mente logo cria cenários negativos ou de rejeição.",
                anxiety: 1.0, avoidance: 0, trait: "trust", traitDir: 1
            },
            {
                stage: "Etapa 2 de 4: Sinais & Segurança Afetiva",
                dimension: "Regulação Emocional",
                text: "Quando enfrento um problema pessoal difícil, prefiro me isolar e resolver sozinho(a) antes de falar com alguém.",
                anxiety: -0.2, avoidance: 1.0, trait: "regulation", traitDir: -1 // - = Autossuficiência Emocional
            },
            {
                stage: "Etapa 2 de 4: Sinais & Segurança Afetiva",
                dimension: "Visão de Si e do Outro",
                text: "Sinto-me seguro(a) de que, mesmo nos dias difíceis ou silenciosos, o vínculo com meu parceiro permanece firme.",
                anxiety: -1.0, avoidance: -0.4, trait: "trust", traitDir: -1 // - = Confiança Básica
            },
            {
                stage: "Etapa 2 de 4: Sinais & Segurança Afetiva",
                dimension: "Intimidade e Vulnerabilidade",
                text: "Desejo muito ter um relacionamento próximo, mas tenho um medo profundo de acabar me machucando se me entregar.",
                anxiety: 0.85, avoidance: 0.85, trait: "vulnerability", traitDir: 1
            },
            {
                stage: "Etapa 2 de 4: Sinais & Segurança Afetiva",
                dimension: "Regulação Emocional",
                text: "Preciso ouvir e receber demonstrações frequentes de afeto para ter certeza de que está tudo bem na relação.",
                anxiety: 1.0, avoidance: -0.3, trait: "regulation", traitDir: 1
            },
            {
                stage: "Etapa 2 de 4: Sinais & Segurança Afetiva",
                dimension: "Autonomia vs. Fusão",
                text: "Quando alguém se mostra muito intenso(a) ou carente comigo, meu instinto imediato é dar um passo para trás.",
                anxiety: -0.2, avoidance: 1.0, trait: "autonomy", traitDir: -1
            },

            // ETAPA 3: Reação a Conflitos & Tensão
            {
                stage: "Etapa 3 de 4: Conflitos & Tensão Relacional",
                dimension: "Reação a Conflitos",
                text: "Durante uma discussão, sinto uma urgência enorme de resolver tudo na mesma hora; não consigo dormir ou trabalhar sem esclarecer.",
                anxiety: 0.95, avoidance: -0.5, trait: "conflict", traitDir: 1 // + = Enfrentamento / Protesto
            },
            {
                stage: "Etapa 3 de 4: Conflitos & Tensão Relacional",
                dimension: "Reação a Conflitos",
                text: "Quando uma conversa fica emocionalmente carregada, eu costumo travar, silenciar ou sair de perto para esfriar a cabeça.",
                anxiety: 0, avoidance: 1.0, trait: "conflict", traitDir: -1 // - = Retraimento / Fuga
            },
            {
                stage: "Etapa 3 de 4: Conflitos & Tensão Relacional",
                dimension: "Reação a Conflitos",
                text: "Às vezes, quando me sinto magoado(a) ou ignorado(a), acabo agindo de forma impulsiva ou testando a reação do outro.",
                anxiety: 0.9, avoidance: 0.3, trait: "conflict", traitDir: 1
            },
            {
                stage: "Etapa 3 de 4: Conflitos & Tensão Relacional",
                dimension: "Visão de Si e do Outro",
                text: "Consigo discordar e ter conflitos com quem amo sem sentir que o relacionamento está prestes a acabar.",
                anxiety: -1.0, avoidance: -0.5, trait: "trust", traitDir: -1
            },
            {
                stage: "Etapa 3 de 4: Conflitos & Tensão Relacional",
                dimension: "Reação a Conflitos",
                text: "Prefiro engolir uma insatisfação e seguir em frente sozinho(a) do que ter uma DR (discussão de relacionamento).",
                anxiety: 0.1, avoidance: 0.95, trait: "conflict", traitDir: -1
            },
            {
                stage: "Etapa 3 de 4: Conflitos & Tensão Relacional",
                dimension: "Intimidade e Vulnerabilidade",
                text: "Tenho medo de que, se as pessoas me conhecerem por inteiro (com meus defeitos), acabarão me rejeitando.",
                anxiety: 0.95, avoidance: 0.5, trait: "vulnerability", traitDir: 1
            },

            // ETAPA 4: Identidade, Passado & Padrões Profundos
            {
                stage: "Etapa 4 de 4: Identidade & Padrões Profundos",
                dimension: "Autonomia vs. Fusão",
                text: "Sinto-me sufocado(a) se um parceiro espera que eu dê satisfação constante sobre meus planos e horários.",
                anxiety: -0.2, avoidance: 1.0, trait: "autonomy", traitDir: -1
            },
            {
                stage: "Etapa 4 de 4: Identidade & Padrões Profundos",
                dimension: "Autonomia vs. Fusão",
                text: "Quando estou apaixonado(a), meu humor e bem-estar passam a girar quase totalmente em torno de como a relação está.",
                anxiety: 1.0, avoidance: -0.3, trait: "autonomy", traitDir: 1
            },
            {
                stage: "Etapa 4 de 4: Identidade & Padrões Profundos",
                dimension: "Regulação Emocional",
                text: "Consigo acalmar minhas próprias inseguranças sem exigir que o outro mude seu comportamento para me tranquilizar.",
                anxiety: -0.9, avoidance: 0.2, trait: "regulation", traitDir: -1
            },
            {
                stage: "Etapa 4 de 4: Identidade & Padrões Profundos",
                dimension: "Intimidade e Vulnerabilidade",
                text: "Mesmo quando estou com alguém há bastante tempo, mantenho uma barreira interna que poucos conseguem atravessar.",
                anxiety: 0.2, avoidance: 1.0, trait: "vulnerability", traitDir: 1
            },
            {
                stage: "Etapa 4 de 4: Identidade & Padrões Profundos",
                dimension: "Visão de Si e do Outro",
                text: "Oscilo entre querer muito estar perto de alguém e, logo em seguida, sentir vontade de me afastar sem motivo claro.",
                anxiety: 0.85, avoidance: 0.85, trait: "trust", traitDir: 1
            },
            {
                stage: "Etapa 4 de 4: Identidade & Padrões Profundos",
                dimension: "Regulação Emocional",
                text: "Sinto-me digno(a) de receber afeto genuíno e acolho o carinho do outro com naturalidade e gratidão.",
                anxiety: -0.9, avoidance: -0.8, trait: "regulation", traitDir: -1
            }
        ];

        // Estado da Aplicação
        let currentIndex = 0;
        let answers = new Array(questions.length).fill(null); // Valores de -3 a +3
        let userReflections = { q1: "", q2: "", q3: "", skipped: false };
        let calculatedResult = null;
        let aiAnalysisState = {
            status: "waiting_token", // "waiting_token" | "loading" | "connected" | "error"
            aiTopics: null
        };

        // Definição visual dos 7 botões da escala Likert (estilo 16Personalities)
        const likertOptions = [
            { value: -3, size: "w-11 h-11 sm:w-14 sm:h-14", border: "border-indigo-600", bgSelected: "bg-indigo-600", label: "Discordo totalmente" },
            { value: -2, size: "w-9 h-9 sm:w-11 sm:h-11", border: "border-indigo-500", bgSelected: "bg-indigo-500", label: "Discordo" },
            { value: -1, size: "w-7 h-7 sm:w-9 sm:h-9", border: "border-indigo-400", bgSelected: "bg-indigo-400", label: "Discordo parcialmente" },
            { value: 0,  size: "w-6 h-6 sm:w-8 sm:h-8", border: "border-slate-300", bgSelected: "bg-slate-400", label: "Neutro" },
            { value: 1,  size: "w-7 h-7 sm:w-9 sm:h-9", border: "border-emerald-400", bgSelected: "bg-emerald-400", label: "Concordo parcialmente" },
            { value: 2,  size: "w-9 h-9 sm:w-11 sm:h-11", border: "border-emerald-500", bgSelected: "bg-emerald-500", label: "Concordo" },
            { value: 3,  size: "w-11 h-11 sm:w-14 sm:h-14", border: "border-emerald-600", bgSelected: "bg-emerald-600", label: "Concordo totalmente" }
        ];

        // Inicializa ícones Lucide
        document.addEventListener("DOMContentLoaded", () => {
            lucide.createIcons();
            updateAiStatusUI();
        });

        function goHome() {
            document.getElementById('screen-intro').classList.remove('hidden');
            document.getElementById('screen-quiz').classList.add('hidden');
            document.getElementById('screen-ai-session').classList.add('hidden');
            document.getElementById('screen-results').classList.add('hidden');
            document.getElementById('nav-start-btn').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function startAssessment() {
            currentIndex = 0;
            answers = new Array(questions.length).fill(null);
            userReflections = { q1: "", q2: "", q3: "", skipped: false };
            document.getElementById('ai-q1').value = "";
            document.getElementById('ai-q2').value = "";
            document.getElementById('ai-q3').value = "";

            document.getElementById('screen-intro').classList.add('hidden');
            document.getElementById('screen-ai-session').classList.add('hidden');
            document.getElementById('screen-results').classList.add('hidden');
            document.getElementById('screen-quiz').classList.remove('hidden');
            document.getElementById('nav-start-btn').classList.add('hidden');
            renderQuestion();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function renderQuestion() {
            const q = questions[currentIndex];
            const total = questions.length;
            // As 24 perguntas correspondem aos primeiros 92% da jornada; os 8% finais são a Sessão IA
            const pct = Math.round(((currentIndex + 1) / (total + 2)) * 100);

            document.getElementById('stage-badge').textContent = q.stage.replace("de 4", "de 5");
            document.getElementById('progress-text').textContent = `${currentIndex + 1} / ${total} (${pct}%)`;
            document.getElementById('progress-bar').style.width = `${pct}%`;

            document.getElementById('dimension-tag').textContent = `Dimensão: ${q.dimension}`;
            document.getElementById('question-statement').textContent = `"${q.text}"`;

            // Renderiza os 7 círculos
            const scaleContainer = document.getElementById('likert-scale');
            scaleContainer.innerHTML = '';

            likertOptions.forEach(opt => {
                const isSelected = answers[currentIndex] === opt.value;
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.setAttribute('aria-label', opt.label);
                btn.title = opt.label;
                btn.className = `likert-circle rounded-full border-2 ${opt.size} ${opt.border} ${isSelected ? `${opt.bgSelected} selected text-white shadow-md` : 'bg-white hover:bg-slate-50 text-transparent'}`;
                
                btn.innerHTML = isSelected ? `<i data-lucide="check" class="w-4 h-4 stroke-[3]"></i>` : '';
                btn.onclick = () => handleSelectAnswer(opt.value);
                scaleContainer.appendChild(btn);
            });

            // Atualiza botões anterior/próxima
            document.getElementById('btn-prev').disabled = currentIndex === 0;
            const btnNext = document.getElementById('btn-next');
            btnNext.disabled = answers[currentIndex] === null;
            document.getElementById('btn-next-label').textContent = currentIndex === total - 1 ? "Ir para Sessão IA" : "Próxima";

            lucide.createIcons();
        }

        function handleSelectAnswer(val) {
            answers[currentIndex] = val;
            renderQuestion();

            // Avanço automático suave após pequeno delay para feedback visual
            setTimeout(() => {
                if (currentIndex < questions.length - 1) {
                    currentIndex++;
                    renderQuestion();
                } else {
                    openAiSessionScreen();
                }
            }, 260);
        }

        function prevQuestion() {
            if (currentIndex > 0) {
                currentIndex--;
                renderQuestion();
            }
        }

        function nextQuestion() {
            if (answers[currentIndex] === null) return;
            if (currentIndex < questions.length - 1) {
                currentIndex++;
                renderQuestion();
            } else {
                openAiSessionScreen();
            }
        }

        function openAiSessionScreen() {
            document.getElementById('screen-quiz').classList.add('hidden');
            document.getElementById('screen-ai-session').classList.remove('hidden');
            updateAiStatusUI();
            lucide.createIcons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function backToLastQuestion() {
            document.getElementById('screen-ai-session').classList.add('hidden');
            document.getElementById('screen-quiz').classList.remove('hidden');
            currentIndex = questions.length - 1;
            renderQuestion();
        }

        function finalizeWithAI(skipped) {
            userReflections = {
                q1: document.getElementById('ai-q1').value.trim(),
                q2: document.getElementById('ai-q2').value.trim(),
                q3: document.getElementById('ai-q3').value.trim(),
                skipped: skipped
            };
            computeAndShowResults();
        }

        // =========================================================
        // MOTOR PSICOMÉTRICO: CÁLCULO DO ESPECTRO 2D + 5 FACETAS
        // =========================================================
        function computeAndShowResults() {
            let anxScore = 0, anxMax = 0;
            let avoScore = 0, avoMax = 0;

            const traits = {
                regulation: { score: 0, max: 0 },     // - Autossuficiência vs + Co-regulação
                vulnerability: { score: 0, max: 0 },  // - Abertura Emocional vs + Autoproteção
                conflict: { score: 0, max: 0 },       // - Retraimento/Fuga vs + Enfrentamento/Protesto
                autonomy: { score: 0, max: 0 },       // - Independência Estrita vs + Hiperconexão/Fusão
                trust: { score: 0, max: 0 }           // - Confiança Básica vs + Hipervigilância
            };

            questions.forEach((q, idx) => {
                const ans = answers[idx] || 0; // -3 a +3

                if (q.anxiety !== 0) {
                    anxScore += ans * q.anxiety;
                    anxMax += 3 * Math.abs(q.anxiety);
                }
                if (q.avoidance !== 0) {
                    avoScore += ans * q.avoidance;
                    avoMax += 3 * Math.abs(q.avoidance);
                }
                if (q.trait && traits[q.trait]) {
                    traits[q.trait].score += ans * q.traitDir;
                    traits[q.trait].max += 3;
                }
            });

            // Normaliza de [-max, +max] para [0, 100]%
            const anxietyPct = Math.round(((anxScore + anxMax) / (2 * anxMax)) * 100);
            const avoidancePct = Math.round(((avoScore + avoMax) / (2 * avoMax)) * 100);

            const traitPcts = {};
            for (const key in traits) {
                const t = traits[key];
                traitPcts[key] = Math.round(((t.score + t.max) / (2 * t.max)) * 100);
            }

            // Determina o Quadrante Principal e Subtipo (Espectro)
            const diagnosis = classifySpectrum(anxietyPct, avoidancePct);

            // Calcula afinidade percentual relativa com os 4 quadrantes (distância inversa aos cantos)
            // Cantos: Seguro (0,0), Ansioso (100, 0), Evitativo (0, 100), Desorganizado (100, 100)
            const distSeguro = Math.hypot(anxietyPct - 15, avoidancePct - 15);
            const distAnsioso = Math.hypot(anxietyPct - 85, avoidancePct - 15);
            const distEvitativo = Math.hypot(anxietyPct - 15, avoidancePct - 85);
            const distDesorg = Math.hypot(anxietyPct - 85, avoidancePct - 85);

            const invSeguro = 1 / (distSeguro + 12);
            const invAnsioso = 1 / (distAnsioso + 12);
            const invEvitativo = 1 / (distEvitativo + 12);
            const invDesorg = 1 / (distDesorg + 12);
            const sumInv = invSeguro + invAnsioso + invEvitativo + invDesorg;

            const affinities = {
                seguro: Math.round((invSeguro / sumInv) * 100),
                ansioso: Math.round((invAnsioso / sumInv) * 100),
                evitativo: Math.round((invEvitativo / sumInv) * 100),
                desorganizado: Math.round((invDesorg / sumInv) * 100)
            };
            // Ajuste fino para somar exatamente 100%
            const diff100 = 100 - (affinities.seguro + affinities.ansioso + affinities.evitativo + affinities.desorganizado);
            affinities[diagnosis.primaryKey] += diff100;

            calculatedResult = {
                anxietyPct,
                avoidancePct,
                traitPcts,
                diagnosis,
                affinities
            };

            renderResultsScreen();
            runAiSynthesis();
        }

        function classifySpectrum(anx, avo) {
            const isHighAnx = anx >= 50;
            const isHighAvo = avo >= 50;
            const distFromCenter = Math.hypot(anx - 50, avo - 50);

            let primaryKey = 'seguro';
            if (!isHighAnx && !isHighAvo) primaryKey = 'seguro';
            else if (isHighAnx && !isHighAvo) primaryKey = 'ansioso';
            else if (!isHighAnx && isHighAvo) primaryKey = 'evitativo';
            else primaryKey = 'desorganizado';

            // Intensidade no espectro
            let intensity = "Moderado";
            if (distFromCenter < 14) intensity = "Equilibrado / Limítrofe (Zona Mista)";
            else if (distFromCenter >= 32) intensity = "Acentuado / Puro";

            // Detecta tendência secundária quando próximo a um eixo
            let secondaryNote = "";
            if (distFromCenter < 14) {
                secondaryNote = "Perfil Híbrido: Você transita entre diferentes estilos dependendo da segurança que o parceiro transmite.";
            } else if (primaryKey === 'ansioso') {
                secondaryNote = avo > 35 ? "Subtipo: Ansioso com Mecanismos de Defesa Evitativos" : "Subtipo: Ansioso Clássico (Busca de Fusão e Validação)";
            } else if (primaryKey === 'evitativo') {
                secondaryNote = anx > 35 ? "Subtipo: Evitativo com Insegurança Latente" : "Subtipo: Dispensivo-Autossuficiente Clássico";
            } else if (primaryKey === 'desorganizado') {
                secondaryNote = anx > avo ? "Subtipo: Desorganizado de Polo Ansioso (Aproxima com Medo)" : "Subtipo: Desorganizado de Polo Evitativo (Recua por Autoproteção)";
            } else {
                secondaryNote = anx > avo ? "Subtipo: Seguro com Leve Sensibilidade Afetiva" : "Subtipo: Seguro com Forte Valorização da Autonomia";
            }

            const profiles = {
                seguro: {
                    code: `SEG-${intensity.split(' ')[0].toUpperCase()}`,
                    title: "Apego Seguro",
                    heroGradient: "from-emerald-950 via-teal-900 to-slate-900",
                    summary: "Você possui uma base interna sólida de confiança em si mesmo e nos outros. Consegue navegar entre a intimidade profunda e a autonomia individual sem entrar em pânico por abandono ou sentir-se sufocado pela proximidade.",
                    tabs: {
                        overview: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Sua Arquitetura Emocional</h4>
                            <p>Pessoas no espectro do <strong>Apego Seguro</strong> operam com um modelo mental positivo tanto de si mesmas (<em>"sou digno de amor"</em>) quanto dos parceiros (<em>"as pessoas são geralmente confiáveis e bem-intencionadas"</em>). Isso reduz drasticamente o ruído mental nos relacionamentos.</p>
                            <p>Mesmo quando você enfrenta momentos de insegurança — algo natural a qualquer ser humano — sua capacidade de autorregulação permite que você nomeie o que sente e comunique de forma direta, sem recorrer a jogos psicológicos, testes silenciosos ou explosões emocionais.</p>
                        `,
                        triggers: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Gatilhos e Resposta ao Estresse</h4>
                            <ul class="list-disc pl-5 space-y-2">
                                <li><strong>O que te desestabiliza:</strong> Falta crônica de transparência, inconsistência deliberada (jogos de desinteresse) ou parceiros que se recusam sistematicamente a dialogar.</li>
                                <li><strong>Sua reação típica:</strong> Diante de um afastamento do outro, você tende a dar o benefício da dúvida primeiro, perguntar diretamente o que está acontecendo e estabelecer limites saudáveis se o desrespeito persistir.</li>
                            </ul>
                        `,
                        relationships: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Como Você Ama e Se Relaciona</h4>
                            <p>Você funciona como um <strong>porto seguro</strong>. Parceiros ansiosos costumam se acalmar ao seu lado devido à sua previsibilidade afetiva, e parceiros evitativos sentem menos pressão porque você respeita o espaço individual deles.</p>
                            <p><strong>Ponto de atenção:</strong> Cuidado para não assumir o papel de "terapeuta" ou salvador(a) de parceiros altamente inseguros que não desejam trabalhar suas próprias questões.</p>
                        `,
                        growth: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Próximo Nível de Maturidade Afetiva</h4>
                            <ul class="list-disc pl-5 space-y-2">
                                <li><strong>Mantenha seus limites claros:</strong> Segurança não significa tolerar tudo; significa saber ir embora com paz quando não há reciprocidade.</li>
                                <li><strong>Comunicação Não-Violenta (CNV):</strong> Continue praticando expressar vulnerabilidades antes que pequenos incômodos virem ressentimentos.</li>
                            </ul>
                        `
                    }
                },
                ansioso: {
                    code: `ANX-${intensity.split(' ')[0].toUpperCase()}`,
                    title: "Apego Ansioso (Preocupado)",
                    heroGradient: "from-rose-950 via-pink-950 to-slate-900",
                    summary: "Você tem uma capacidade imensa de amar, se dedicar e perceber nuances emocionais. Porém, seu sistema nervoso fica frequentemente em estado de alerta, temendo rejeição, esfriamento afetivo ou abandono.",
                    tabs: {
                        overview: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Sua Arquitetura Emocional</h4>
                            <p>No espectro <strong>Ansioso-Preocupado</strong>, seu radar emocional está calibrado em alta sensibilidade. Você detecta mudanças mínimas no tom de voz, no tempo de resposta de uma mensagem ou na linguagem corporal do outro.</p>
                            <p>Quando o vínculo parece ameaçado, seu cérebro interpreta o distanciamento como perigo real, ativando uma urgência intensa por reaproximação e validação para restaurar sua paz interna.</p>
                        `,
                        triggers: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Gatilhos e Comportamentos de Protesto</h4>
                            <ul class="list-disc pl-5 space-y-2">
                                <li><strong>Principais gatilhos:</strong> Respostas secas ou demoradas, falta de clareza sobre o futuro da relação, sensação de estar investindo mais do que o outro.</li>
                                <li><strong>Mecanismo de Protesto:</strong> Quando a ansiedade dispara, você pode insistir em resolver tudo na hora, enviar múltiplas mensagens, buscar reasseguramento constante ou, paradoxalmente, fazer birra/ameaçar se afastar esperando que o outro venha atrás.</li>
                            </ul>
                        `,
                        relationships: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Como Você Ama e Se Relaciona</h4>
                            <p>Você entrega profundidade, presença e lealdade. Entretanto, existe uma armadilha clássica: a atração magnética por perfis <strong>Evitativos</strong>. A imprevisibilidade de um evitativo ativa sua adrenalina e pode ser confundida com "paixão avassaladora", criando um ciclo de perseguição e fuga.</p>
                            <p><strong>O que você realmente precisa:</strong> Consistência, comunicação transparente e parceiros emocionalmente disponíveis.</p>
                        `,
                        growth: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Guia Prático rumo ao Apego Seguro</h4>
                            <ul class="list-disc pl-5 space-y-2">
                                <li><strong>Separe fatos de histórias mentais:</strong> Quando alguém demorar a responder, pergunte-se: <em>"Isso é uma prova de abandono ou apenas uma suposição da minha ansiedade?"</em></li>
                                <li><strong>Regule o corpo antes de agir:</strong> Espere 20 minutos antes de enviar uma mensagem carregada de emoção.</li>
                                <li><strong>Descentralize o romance:</strong> Invista energia real em amizades, projetos e hobbies que sustentem sua identidade fora do relacionamento.</li>
                            </ul>
                        `
                    }
                },
                evitativo: {
                    code: `EVI-${intensity.split(' ')[0].toUpperCase()}`,
                    title: "Apego Evitativo (Dispensivo)",
                    heroGradient: "from-sky-950 via-slate-900 to-indigo-950",
                    summary: "Você valoriza profundamente sua liberdade, autonomia e autossuficiência. Quando a intimidade emocional se torna intensa demais ou exige vulnerabilidade, seu instinto automático é recuar para preservar seu espaço e controle.",
                    tabs: {
                        overview: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Sua Arquitetura Emocional</h4>
                            <p>No espectro <strong>Evitativo</strong>, você aprendeu — muitas vezes cedo na vida — que depender emocionalmente dos outros leva à frustração ou perda de liberdade. Por isso, desenvolveu uma armadura de autossuficiência.</p>
                            <p>Você não é frio ou incapaz de amar; na verdade, sente profundamente, mas seu sistema nervoso desativa ou reprime necessidades emocionais quando percebe pressão, cobrança ou expectativa excessiva do parceiro.</p>
                        `,
                        triggers: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Gatilhos e Estratégias de Desativação</h4>
                            <ul class="list-disc pl-5 space-y-2">
                                <li><strong>Principais gatilhos:</strong> Cobranças por mais atenção, DRs prolongadas, sensação de estar sendo controlado(a) ou perder sua individualidade.</li>
                                <li><strong>Mecanismo de Fuga/Desativação:</strong> Quando pressionado(a), você pode focar exageradamente no trabalho, encontrar defeitos súbitos no parceiro, idealizar um "ex" inalcançável ou fechar-se em silêncio emocional.</li>
                            </ul>
                        `,
                        relationships: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Como Você Ama e Se Relaciona</h4>
                            <p>Você demonstra afeto muito mais por meio de ações práticas, presença tranquila e respeito à liberdade do outro do que por grandes declarações dramáticas.</p>
                            <p><strong>Ponto cego:</strong> Ao desaparecer ou silenciar sem explicar que apenas precisa de um tempo para processar suas emoções, você involuntariamente ativa o pânico de abandono em parceiros mais sensíveis.</p>
                        `,
                        growth: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Guia Prático rumo ao Apego Seguro</h4>
                            <ul class="list-disc pl-5 space-y-2">
                                <li><strong>Comunique suas pausas:</strong> Em vez de sumir, diga: <em>"Estou sobrecarregado agora e preciso de 2 horas sozinho, mas voltamos a conversar hoje à noite."</em></li>
                                <li><strong>Pratique micro-vulnerabilidades:</strong> Compartilhe um medo ou frustração pequena sem tentar resolver tudo sozinho(a).</li>
                                <li><strong>Diferencie intimidade de prisão:</strong> Estar próximo de alguém seguro não significa perder quem você é.</li>
                            </ul>
                        `
                    }
                },
                desorganizado: {
                    code: `DES-${intensity.split(' ')[0].toUpperCase()}`,
                    title: "Apego Desorganizado (Medroso-Evitativo)",
                    heroGradient: "from-amber-950 via-stone-900 to-slate-900",
                    summary: "Você carrega um paradoxo emocional intenso: deseja profundamente conexão, intimidade e ser amado(a), mas ao mesmo tempo sente um medo visceral de que a proximidade traga dor, traição ou perda de controle.",
                    tabs: {
                        overview: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Sua Arquitetura Emocional</h4>
                            <p>O estilo <strong>Desorganizado (Medroso-Evitativo)</strong> combina altos índices tanto de Ansiedade quanto de Evitação. É como pisar no acelerador e no freio ao mesmo tempo.</p>
                            <p>Quando você está longe de alguém, sente falta e teme o abandono (polo ansioso). Porém, assim que a relação fica séria e íntima, dispara um alarme interno de perigo e sufocamento, fazendo você querer recuar ou sabotar o vínculo (polo evitativo).</p>
                        `,
                        triggers: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Gatilhos e O Ciclo "Puxa-Empurra"</h4>
                            <ul class="list-disc pl-5 space-y-2">
                                <li><strong>Principais gatilhos:</strong> Tanto a frieza/distância do outro quanto a entrega profunda e a vulnerabilidade mútua.</li>
                                <li><strong>Reação típica:</strong> Oscilação rápida entre idealizar o parceiro e desconfiar completamente dele; dificuldade em confiar que algo bom vai durar.</li>
                            </ul>
                        `,
                        relationships: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Como Você Ama e Se Relaciona</h4>
                            <p>Você tem uma empatia profunda e enxerga a alma das pessoas com facilidade, mas relacionamentos caóticos ou imprevisíveis costumam parecer familiares demais para você.</p>
                            <p><strong>O que você realmente precisa:</strong> Paciência, previsibilidade extrema e um ambiente onde você possa baixar a guarda aos poucos, sem ser julgado(a) por suas oscilações.</p>
                        `,
                        growth: `
                            <h4 class="font-display font-bold text-slate-900 text-lg">Guia Prático rumo ao Apego Seguro</h4>
                            <ul class="list-disc pl-5 space-y-2">
                                <li><strong>Reconheça o alarme falso:</strong> Quando sentir vontade súbita de fugir de uma pessoa boa, pergunte-se: <em>"Ela realmente me fez mal ou estou com medo de me sentir vulnerável?"</em></li>
                                <li><strong>Vá devagar:</strong> Construa vínculos em ritmo gradual, permitindo que a confiança seja testada na realidade, não no medo.</li>
                                <li><strong>Autocompaixão e Terapia:</strong> Abordagens focadas em trauma e apego (como Terapia do Esquema ou EMDR) são transformadoras para esse perfil.</li>
                            </ul>
                        `
                    }
                }
            };

            return {
                primaryKey,
                intensity,
                secondaryNote,
                profile: profiles[primaryKey]
            };
        }

        function renderResultsScreen() {
            const { anxietyPct, avoidancePct, traitPcts, diagnosis, affinities } = calculatedResult;
            const p = diagnosis.profile;

            document.getElementById('screen-quiz').classList.add('hidden');
            document.getElementById('screen-ai-session').classList.add('hidden');
            document.getElementById('screen-results').classList.remove('hidden');
            document.getElementById('nav-start-btn').classList.remove('hidden');

            // Atualiza Hero Banner
            const hero = document.getElementById('result-hero');
            hero.className = `rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden bg-gradient-to-br ${p.heroGradient}`;
            
            document.getElementById('result-code-badge').textContent = `ARQUÉTIPO: ${p.code}`;
            document.getElementById('result-main-title').textContent = p.title;
            document.getElementById('result-subtype').textContent = diagnosis.secondaryNote;
            document.getElementById('result-summary').textContent = p.summary;

            document.getElementById('score-anxiety-val').textContent = `${anxietyPct}%`;
            document.getElementById('score-anxiety-bar').style.width = `${anxietyPct}%`;
            document.getElementById('score-avoidance-val').textContent = `${avoidancePct}%`;
            document.getElementById('score-avoidance-bar').style.width = `${avoidancePct}%`;

            // Posiciona o ponto exato no Gráfico Cartesiano SVG
            // X: Evitação (0% -> x=40, 100% -> x=360)
            // Y: Ansiedade (0% -> y=350, 100% -> y=30)
            const svgX = 40 + (avoidancePct / 100) * 320;
            const svgY = 350 - (anxietyPct / 100) * 320;
            const plotPoint = document.getElementById('user-plot-point');
            plotPoint.setAttribute('transform', `translate(${svgX.toFixed(1)}, ${svgY.toFixed(1)})`);

            // Renderiza as 5 Barras de Espectro Duplo estilo MBTI
            const traitsConfig = [
                {
                    key: "regulation",
                    title: "1. Regulação Emocional",
                    leftLabel: "Autossuficiência Interna",
                    rightLabel: "Co-regulação & Validação",
                    leftColor: "bg-indigo-600",
                    rightColor: "bg-rose-500",
                    rightPct: traitPcts.regulation
                },
                {
                    key: "vulnerability",
                    title: "2. Intimidade & Vulnerabilidade",
                    leftLabel: "Abertura Emocional",
                    rightLabel: "Autoproteção & Reserva",
                    leftColor: "bg-emerald-600",
                    rightColor: "bg-sky-600",
                    rightPct: traitPcts.vulnerability
                },
                {
                    key: "conflict",
                    title: "3. Reação a Conflitos",
                    leftLabel: "Retraimento / Fuga",
                    rightLabel: "Enfrentamento / Protesto",
                    leftColor: "bg-slate-600",
                    rightColor: "bg-amber-500",
                    rightPct: traitPcts.conflict
                },
                {
                    key: "autonomy",
                    title: "4. Autonomia vs. Conexão",
                    leftLabel: "Independência Estrita",
                    rightLabel: "Fusão & Hiperconexão",
                    leftColor: "bg-cyan-600",
                    rightColor: "bg-violet-600",
                    rightPct: traitPcts.autonomy
                },
                {
                    key: "trust",
                    title: "5. Lente Afetiva",
                    leftLabel: "Confiança Básica",
                    rightLabel: "Hipervigilância Afetiva",
                    leftColor: "bg-teal-600",
                    rightColor: "bg-pink-600",
                    rightPct: traitPcts.trust
                }
            ];

            const traitsContainer = document.getElementById('mbti-traits-container');
            traitsContainer.innerHTML = '';

            traitsConfig.forEach(item => {
                const rightVal = item.rightPct;
                const leftVal = 100 - rightVal;
                const isRightDominant = rightVal >= 50;

                const row = document.createElement('div');
                row.className = "space-y-1.5";
                row.innerHTML = `
                    <div class="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>${item.title}</span>
                        <span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            ${isRightDominant ? `${rightVal}% ${item.rightLabel}` : `${leftVal}% ${item.leftLabel}`}
                        </span>
                    </div>
                    <div class="flex items-center space-x-2 text-[11px] font-bold">
                        <span class="w-10 text-left ${!isRightDominant ? 'text-slate-900' : 'text-slate-400'}">${leftVal}%</span>
                        <div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200/70">
                            <div class="${!isRightDominant ? item.leftColor : 'bg-slate-200'} h-full rounded-l-full transition-all duration-700" style="width: ${leftVal}%"></div>
                            <div class="w-0.5 bg-white"></div>
                            <div class="${isRightDominant ? item.rightColor : 'bg-slate-200'} h-full rounded-r-full transition-all duration-700" style="width: ${rightVal}%"></div>
                        </div>
                        <span class="w-10 text-right ${isRightDominant ? 'text-slate-900' : 'text-slate-400'}">${rightVal}%</span>
                    </div>
                    <div class="flex justify-between text-[11px] font-medium text-slate-500">
                        <span class="${!isRightDominant ? 'font-bold text-slate-800' : ''}">${item.leftLabel}</span>
                        <span class="${isRightDominant ? 'font-bold text-slate-800' : ''}">${item.rightLabel}</span>
                    </div>
                `;
                traitsContainer.appendChild(row);
            });

            // Renderiza os 4 Cards de Composição Percentual
            const quadData = [
                { key: 'seguro', name: 'Seguro', pct: affinities.seguro, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', bar: 'bg-emerald-500' },
                { key: 'ansioso', name: 'Ansioso', pct: affinities.ansioso, color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200', bar: 'bg-rose-500' },
                { key: 'evitativo', name: 'Evitativo', pct: affinities.evitativo, color: 'text-sky-700', bg: 'bg-sky-50 border-sky-200', bar: 'bg-sky-500' },
                { key: 'desorganizado', name: 'Desorganizado', pct: affinities.desorganizado, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', bar: 'bg-amber-500' }
            ];

            const quadGrid = document.getElementById('quadrant-affinity-grid');
            quadGrid.innerHTML = '';
            quadData.forEach(q => {
                const isMain = q.key === diagnosis.primaryKey;
                const card = document.createElement('div');
                card.className = `p-4 rounded-2xl border ${isMain ? q.bg + ' ring-2 ring-offset-1 ring-indigo-500/40' : 'bg-slate-50/70 border-slate-200/80'} space-y-2`;
                card.innerHTML = `
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold uppercase tracking-wider ${isMain ? q.color : 'text-slate-600'}">${q.name}</span>
                        ${isMain ? '<span class="text-[10px] font-extrabold bg-white px-2 py-0.5 rounded-full shadow-2xs text-slate-800">Principal</span>' : ''}
                    </div>
                    <div class="font-display text-2xl font-extrabold text-slate-900">${q.pct}%</div>
                    <div class="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                        <div class="${q.bar} h-full rounded-full" style="width: ${q.pct}%"></div>
                    </div>
                `;
                quadGrid.appendChild(card);
            });

            // Abre a primeira aba do Dossiê
            switchTab('overview');
            lucide.createIcons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // =========================================================
        // MOTOR DE INTELIGÊNCIA ARTIFICIAL (STATUS, PRÉVIA & API)
        // =========================================================
        function updateAiStatusUI() {
            const hasToken = AI_API_TOKEN && AI_API_TOKEN.trim().length > 0;
            const navDot = document.getElementById('nav-ai-dot');
            const sessionDot = document.getElementById('session-ai-indicator');
            const sessionTitle = document.getElementById('session-ai-status-title');

            const pill = document.getElementById('ai-status-pill');
            const dot = document.getElementById('ai-status-dot');
            const label = document.getElementById('ai-status-label');
            const banner = document.getElementById('ai-token-placeholder-banner');

            if (!hasToken) {
                aiAnalysisState.status = "waiting_token";
                if (navDot) navDot.className = "w-2 h-2 rounded-full bg-amber-400";
                if (sessionDot) sessionDot.className = "w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0";
                if (sessionTitle) sessionTitle.textContent = "IA: Aguardando Token de API";

                if (pill) {
                    pill.className = "inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs font-bold";
                    dot.className = "w-2 h-2 rounded-full bg-amber-400 animate-pulse";
                    label.textContent = "IA: Aguardando Token";
                }
                if (banner) banner.classList.remove('hidden');
            } else if (aiAnalysisState.status === "loading") {
                if (navDot) navDot.className = "w-2 h-2 rounded-full bg-indigo-400 animate-ping";
                if (pill) {
                    pill.className = "inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 text-xs font-bold";
                    dot.className = "w-2 h-2 rounded-full bg-indigo-400 animate-ping";
                    label.textContent = "IA: Analisando...";
                }
                if (banner) banner.classList.add('hidden');
            } else if (aiAnalysisState.status === "connected") {
                if (navDot) navDot.className = "w-2 h-2 rounded-full bg-emerald-400";
                if (sessionDot) sessionDot.className = "w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0";
                if (sessionTitle) sessionTitle.textContent = `IA: Conectada (${AI_PROVIDER.toUpperCase()})`;

                if (pill) {
                    pill.className = "inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold";
                    dot.className = "w-2 h-2 rounded-full bg-emerald-400";
                    label.textContent = `IA: Ativa (${AI_PROVIDER.toUpperCase()})`;
                }
                if (banner) banner.classList.add('hidden');
            } else if (aiAnalysisState.status === "error") {
                if (navDot) navDot.className = "w-2 h-2 rounded-full bg-rose-500";
                if (pill) {
                    pill.className = "inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs font-bold";
                    dot.className = "w-2 h-2 rounded-full bg-rose-400";
                    label.textContent = "IA: Erro na API";
                }
                if (banner) banner.classList.remove('hidden');
            }
        }

        async function runAiSynthesis() {
            if (!calculatedResult) return;

            // Exibe o resumo do que o usuário escreveu na Sessão IA, se preencheu algo
            const combinedText = [userReflections.q1, userReflections.q2, userReflections.q3]
                .filter(Boolean)
                .join(" • ");

            const reflectionBox = document.getElementById('user-reflection-summary-box');
            const reflectionPreview = document.getElementById('user-reflection-preview');

            if (!userReflections.skipped && combinedText.length > 0) {
                reflectionBox.classList.remove('hidden');
                reflectionPreview.textContent = `"${combinedText}"`;
            } else {
                reflectionBox.classList.add('hidden');
            }

            // Sempre gera primeiro a síntese objetiva estruturada local (garante resposta imediata)
            const localTopics = buildStructuredLocalSynthesis(calculatedResult, userReflections);
            renderAiTopicCards(localTopics);

            const hasToken = AI_API_TOKEN && AI_API_TOKEN.trim().length > 0;
            if (!hasToken) {
                aiAnalysisState.status = "waiting_token";
                updateAiStatusUI();
                return;
            }

            // Se houver token, chama a API real (Gemini ou OpenAI)
            aiAnalysisState.status = "loading";
            updateAiStatusUI();

            try {
                const aiTopics = await fetchAiClinicalSynthesis(calculatedResult, userReflections);
                if (aiTopics && Array.isArray(aiTopics) && aiTopics.length > 0) {
                    aiAnalysisState.status = "connected";
                    aiAnalysisState.aiTopics = aiTopics;
                    renderAiTopicCards(aiTopics);
                } else {
                    aiAnalysisState.status = "error";
                }
            } catch (err) {
                console.error("Erro na chamada da IA:", err);
                aiAnalysisState.status = "error";
            }
            updateAiStatusUI();
        }

        function buildStructuredLocalSynthesis(res, refl) {
            const { anxietyPct, avoidancePct, traitPcts, diagnosis } = res;
            const hasText = !refl.skipped && (refl.q1 || refl.q2 || refl.q3);

            const topTrait = Object.entries(traitPcts).sort((a, b) => Math.abs(b[1] - 50) - Math.abs(a[1] - 50))[0];
            const traitNames = {
                regulation: topTrait[1] >= 50 ? "Busca por Validação" : "Autossuficiência Emocional",
                vulnerability: topTrait[1] >= 50 ? "Autoproteção Afetiva" : "Abertura Emocional",
                conflict: topTrait[1] >= 50 ? "Enfrentamento Imediato" : "Retraimento em Conflitos",
                autonomy: topTrait[1] >= 50 ? "Hiperconexão" : "Independência Estrita",
                trust: topTrait[1] >= 50 ? "Hipervigilância" : "Confiança Básica"
            };

            return [
                {
                    icon: "target",
                    badge: "1. Núcleo do Espectro",
                    title: `${diagnosis.profile.title} (${anxietyPct}% Anx / ${avoidancePct}% Evi)`,
                    points: [
                        `Perfil <strong>${diagnosis.intensity.split(' ')[0]}</strong> com destaque em <strong>${traitNames[topTrait[0]]}</strong>.`,
                        hasText
                            ? `Seu relato confirma a atenção necessária a esse padrão no dia a dia.`
                            : `Insira um token para cruzar seu relato pessoal com estas métricas.`
                    ]
                },
                {
                    icon: "alert-triangle",
                    badge: "2. Ponto Cego & Gatilho",
                    title: "Onde sua defesa ativa",
                    points: [
                        anxietyPct >= 50
                            ? `Silêncios ou respostas curtas tendem a disparar medo de rejeição.`
                            : `Baixo medo de abandono, mas cuide para não minimizar emoções.`,
                        avoidancePct >= 50
                            ? `Cobranças por intimidade fazem você recuar ou se fechar.`
                            : `Boa abertura afetiva; mantenha limites individuais claros.`
                    ]
                },
                {
                    icon: "heart-handshake",
                    badge: "3. Dinâmica Relacional",
                    title: "Como você age a dois",
                    points: [
                        `Equilíbrio: <strong>${100 - traitPcts.autonomy}% Independência</strong> vs. <strong>${traitPcts.autonomy}% Fusão</strong>.`,
                        `Nos conflitos, tende ao <strong>${traitPcts.conflict >= 50 ? "enfrentamento imediato" : "retraimento e pausa"}</strong>.`
                    ]
                },
                {
                    icon: "compass",
                    badge: "4. Ação Prática",
                    title: "Próximo passo objetivo",
                    points: [
                        anxietyPct > avoidancePct
                            ? `Acalme sua ansiedade antes de cobrar validação imediata.`
                            : avoidancePct > anxietyPct
                            ? `Avise quando precisar de espaço em vez de apenas silenciar.`
                            : `Mantenha o diálogo aberto e a reciprocidade consciente.`
                    ]
                }
            ];
        }

        async function fetchAiClinicalSynthesis(res, refl) {
            const prompt = `Você é um psicólogo especialista em Teoria do Apego (ECR-R). Seja EXTREMAMENTE CONCISO e OBJETIVO. Retorne apenas JSON válido (sem markdown) no formato:
[{"icon":"target","badge":"1. Núcleo do Espectro","title":"Título curto","points":["1 frase curta","1 frase curta"]},{"icon":"alert-triangle","badge":"2. Ponto Cego & Gatilho","title":"Título curto","points":["1 frase curta","1 frase curta"]},{"icon":"heart-handshake","badge":"3. Dinâmica Relacional","title":"Título curto","points":["1 frase curta","1 frase curta"]},{"icon":"compass","badge":"4. Ação Prática","title":"Título curto","points":["1 frase curta"]}]

Regras: Máximo 15 palavras por bullet point. Pontue objetivamente o relato do usuário:
- Perfil: ${res.diagnosis.profile.title} (Ansiedade ${res.anxietyPct}%, Evitação ${res.avoidancePct}%)
- Relato: P1: ${refl.q1 || "-"} | P2: ${refl.q2 || "-"} | P3: ${refl.q3 || "-"}`;

            if (AI_PROVIDER === "gemini") {
                const geminiModels = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-2.5-flash-preview-05-06"];

                let lastError = null;
                for (const model of geminiModels) {
                    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(AI_API_TOKEN)}`;
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                            generationConfig: { responseMimeType: "application/json" }
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
                        return JSON.parse(rawText);
                    }

                    lastError = response;
                    if (response.status !== 404) {
                        break;
                    }
                }

                if (lastError) {
                    const errorBody = await lastError.text().catch(() => "");
                    throw new Error(`Falha na API Gemini (${lastError.status}): ${errorBody || "modelo indisponível"}`);
                }

                throw new Error("Falha na API Gemini: não foi possível encontrar um modelo disponível.");
            } else {
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${AI_API_TOKEN}`
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: [{ role: "user", content: prompt }],
                        temperature: 0.5
                    })
                });
                if (!response.ok) throw new Error("Falha na API OpenAI");
                const data = await response.json();
                const rawText = data.choices?.[0]?.message?.content || "[]";
                return JSON.parse(rawText.replace(/```json|```/g, "").trim());
            }
        }

        function renderAiTopicCards(topics) {
            const grid = document.getElementById('ai-topics-grid');
            if (!grid) return;
            grid.innerHTML = '';

            topics.forEach(item => {
                const card = document.createElement('div');
                card.className = "bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 hover:bg-white/[0.07] transition-colors";
                const pointsHtml = (item.points || [])
                    .map(pt => `<li class="flex items-start space-x-2 text-xs sm:text-sm text-slate-200 leading-relaxed"><span class="text-indigo-400 font-bold mt-0.5">&bull;</span><span>${pt}</span></li>`)
                    .join('');

                card.innerHTML = `
                    <div class="flex items-center justify-between">
                        <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-lg">${item.badge}</span>
                        <i data-lucide="${item.icon || 'sparkles'}" class="w-4 h-4 text-indigo-300"></i>
                    </div>
                    <h4 class="font-display font-bold text-white text-base">${item.title}</h4>
                    <ul class="space-y-2 pt-1">${pointsHtml}</ul>
                `;
                grid.appendChild(card);
            });
            lucide.createIcons();
        }

        function toggleApiModal(show) {
            const modal = document.getElementById('api-modal');
            if (show) {
                document.getElementById('api-provider-select').value = AI_PROVIDER;
                document.getElementById('api-token-input').value = AI_API_TOKEN;
                modal.classList.remove('hidden');
                lucide.createIcons();
            } else {
                modal.classList.add('hidden');
            }
        }

        function saveApiToken() {
            AI_PROVIDER = document.getElementById('api-provider-select').value;
            AI_API_TOKEN = document.getElementById('api-token-input').value.trim();
            toggleApiModal(false);
            updateAiStatusUI();
            if (calculatedResult && !document.getElementById('screen-results').classList.contains('hidden')) {
                runAiSynthesis();
            }
            showToast(AI_API_TOKEN ? "Token salvo! Atualizando análise de IA..." : "Token vazio: Modo Demonstração ativo.");
        }

        function clearApiToken() {
            AI_API_TOKEN = "";
            document.getElementById('api-token-input').value = "";
            toggleApiModal(false);
            updateAiStatusUI();
            if (calculatedResult && !document.getElementById('screen-results').classList.contains('hidden')) {
                runAiSynthesis();
            }
            showToast("Token removido. Status retornado para Aguardando Token.");
        }

        function switchTab(tabKey) {
            if (!calculatedResult) return;
            const tabs = document.querySelectorAll('.tab-btn');
            tabs.forEach(btn => {
                if (btn.dataset.tab === tabKey) {
                    btn.className = "tab-btn active pb-3.5 px-2 text-sm font-bold border-b-2 border-indigo-600 text-indigo-600 whitespace-nowrap flex items-center space-x-2";
                } else {
                    btn.className = "tab-btn pb-3.5 px-2 text-sm font-semibold border-b-2 border-transparent text-slate-500 hover:text-slate-800 whitespace-nowrap flex items-center space-x-2";
                }
            });

            document.getElementById('dossier-content').innerHTML = calculatedResult.diagnosis.profile.tabs[tabKey];
        }

        function toggleTheoryModal(show) {
            const modal = document.getElementById('theory-modal');
            if (show) {
                modal.classList.remove('hidden');
                lucide.createIcons();
            } else {
                modal.classList.add('hidden');
            }
        }

        function copyFullReport() {
            if (!calculatedResult) return;
            const { anxietyPct, avoidancePct, traitPcts, diagnosis, affinities } = calculatedResult;
            const p = diagnosis.profile;

            const reportText = [
                `🧭 MEU MAPEAMENTO DE APEGO & ESPECTRO RELACIONAL (por Souga Dev • github.com/sougasa)`,
                `• Arquétipo Principal: ${p.title} (${diagnosis.intensity})`,
                `• ${diagnosis.secondaryNote}`,
                ``,
                `📊 ÍNDICES ECR-R:`,
                `• Ansiedade de Apego: ${anxietyPct}%`,
                `• Evitação de Intimidade: ${avoidancePct}%`,
                ``,
                `🧩 COMPOSIÇÃO DOS 4 ESTILOS:`,
                `• Seguro: ${affinities.seguro}% | Ansioso: ${affinities.ansioso}% | Evitativo: ${affinities.evitativo}% | Desorganizado: ${affinities.desorganizado}%`,
                ``,
                `⚖️ 5 FACETAS COMPORTAMENTAIS:`,
                `• Regulação: ${100 - traitPcts.regulation}% Autossuficiência vs ${traitPcts.regulation}% Co-regulação`,
                `• Vulnerabilidade: ${100 - traitPcts.vulnerability}% Abertura vs ${traitPcts.vulnerability}% Autoproteção`,
                `• Conflitos: ${100 - traitPcts.conflict}% Retraimento vs ${traitPcts.conflict}% Enfrentamento`,
                `• Autonomia: ${100 - traitPcts.autonomy}% Independência vs ${traitPcts.autonomy}% Hiperconexão`,
                `• Lente Afetiva: ${100 - traitPcts.trust}% Confiança vs ${traitPcts.trust}% Hipervigilância`
            ].join('\n');

            const textarea = document.createElement('textarea');
            textarea.value = reportText;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showToast("Relatório completo copiado para compartilhar!");
            } catch (e) {
                showToast("Não foi possível copiar o relatório.");
            }
            document.body.removeChild(textarea);
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-message').textContent = msg;
            toast.classList.remove('translate-y-24', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-24', 'opacity-0');
            }, 3200);
        }
    