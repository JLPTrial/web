// Abaixo está definido o que pode ser passado como Query Params
// Basicamente, é a parte JSON de uma request.

// Quando forem usar, será algo parecido com:
// const response = await getLevelTopicQuestions(previewLevel, previewTopic, {
//                     page,
//                     limit: 10,
//                     answerStatus: AnswerStatus.Unanswered,
//                     tag: "uso",
//                     ...
//                 })
// Entretanto, para facilitar a vida de vocês, já deixei implementado algumas funções que abstraem isso
// E usam os enums (ou quase enums) para resolver o problema, e simplificar a comunicação.

// TODO: Remover os comentários acima quando todos estiverem acostumados com isso. 


export type GetQuestionsQueryParams = {
    questionId?: number
    tag?: string
    answerStatus?: AnswerStatusConstants
    page?: number
    limit?: number
}

export type GetStatisticsQueryParams = {
    level?: QuestionLevelConstants
    topic?: QuestionTopicConstants
    tag?: string
}

export const AnswerStatus = {
    All: 'all',
    Answered: 'answered',
    Unanswered: 'unanswered',
    Correct: 'correct',
    Incorrect: 'incorrect',
} as const;

export const QuestionTopic = { 
     Grammar: 'grammar', 
     Kanji: 'kanji', 
     Listening: 'listening', 
     Reading: 'reading', 
     Vocabulary: 'vocabulary', 
} as const;

export const QuestionLevel = {
    N4: 4,
    N5: 5,
} as const

export type QuestionTopicConstants = typeof QuestionTopic[keyof typeof QuestionTopic]

export type QuestionLevelConstants = typeof QuestionLevel[keyof typeof QuestionLevel]

export type AnswerStatusConstants = typeof AnswerStatus[keyof typeof AnswerStatus]