import type { ReactNode } from "react";
import ReactFurigana from "react-furigana";

// Definindo os marcadores de formatação (exceto furigana)

function Blank() {
    return (<span className="blank" />);
}

function UnderlineBlank() {
    return (<span className="underline-blank" />);
}

function StarUnderlineBlank() {
    return (<span className="star-underline">★</span>);
}

function Underline({ children }: { children: ReactNode }) {
    return (<span className="underline">{children}</span>);
}


// Definindo os tipos de token
type Token =
    | { type: "text"; value: string; } // as partes do texto onde pode haver furigana ficarão neste token
    | { type: "underline"; value: string; }
    | { type: "blank"; }
    | { type: "underline_blank"; }
    | { type: "star_underline_blank"; }
;

function tokenize(text: string): Token[] {
    const tokens: Token[] = [];
    let buffer = "";
    let i = 0;

    const flush = () => {
        if (buffer) {
            tokens.push(
                {type: "text", value: buffer,}
            );
            buffer = "";
        }
    };

    // iterar pelo texto buscando pelos marcardores de formatação
    while (i < text.length) {

        // marcador de formatação para palavras que devem ser sublinhadas, marcado por chaves, {}
        if (text[i] === "{") {
            const end = text.indexOf("}", i);

            if (end !== -1) {
                flush();

                tokens.push(
                    {type: "underline", value: text.slice(i + 1, end),}
                );

                i = end + 1;
                continue;
            }
        }

        // demais marcadores de formatação, marcados por colchetes, [] (exceto furigana)
        if (text[i] === "[") {
            const end = text.indexOf("]", i);

            if (end !== -1) {
                const square_brackets_content = text.slice(i + 1, end);

                if (
                    square_brackets_content === "blank" ||
                    square_brackets_content === "underline_blank" ||
                    square_brackets_content === "star_underline_blank"
                ) {
                    flush();

                    tokens.push(
                        {type: square_brackets_content,}
                    );

                    i = end + 1;
                    continue;
                }
            }
        }

        // caso não encontre nada do que está sendo buscado acima, não faça nada
        // (isso inclui os casos onde deve ser renderizado furigana, pois o pacote que instalamos já cuida disso)
        buffer += text[i];
        i++;
    }

    flush();

    return tokens;
}


interface JapaneseTextParserProperties { text: string; }

// Se o token for 'text', o pacote instalado que renderiza furigana cuidará disso normalmente
// Caso contrário, esta componente irá cuidar dos demais marcadores de formatação
export default function JapaneseText({ text }: JapaneseTextParserProperties) {

    const tokens = tokenize(text);

    return (
        <>
            {tokens.map(
                (token, index) => {
                    switch (token.type) {
                        
                        case "text":
                            return (<ReactFurigana key={index} text={token.value} />);
                        
                        case "blank":
                            return <Blank key={index} />;

                        case "underline_blank":
                            return <UnderlineBlank key={index} />;

                        case "star_underline_blank":
                            return <StarUnderlineBlank key={index} />;

                        case "underline":
                            return (<Underline key={index}>{token.value}</Underline>);

                        default:
                            return null;
                    }
                }
            )}
        </>
    );
}