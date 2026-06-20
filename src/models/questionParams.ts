export type QuestionTopicConstants = 'grammar' | 'kanji' | 'listening' | 'reading' | 'vocabulary'

export type QuestionLevelConstants = 4 | 5

// Abaixo está definido o que pode ser passado como Query Params
// Basicamente, é a parte JSON de uma request.

// Quando forem usar, será algo parecido com:
// const response = await getLevelTopicQuestions(previewLevel, previewTopic, {
//                     page,
//                     limit: 10,
//                     answered: "false",
//                     tag: "uso",
//                     ...
//                 })
// Entretanto, para facilitar a vida de vocês, já deixei implementado algumas funções que abstraem isso
// E usam os enums (ou quase enums) para resolver o problema, e simplificar a comunicação.

// TODO: Remover os comentários acima quando todos estiverem acostumados com isso. 


export type GetQuestionsQueryParams = {
    questionId?: number
    tag?: string
    answered?: boolean
    page?: number
    limit?: number
}

export const QuestionTopic = {
    Grammar: 'grammar' as const,
    Kanji: 'kanji' as const,
    Listening: 'listening' as const,
    Reading: 'reading' as const,
    Vocabulary: 'vocabulary' as const,
}

export const QuestionLevel = {
    N4: 4 as const,
    N5: 5 as const,
}
