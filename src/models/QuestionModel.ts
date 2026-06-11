// Modelo de questões forçadamente parecido com o do JSON
// Todas as requests que buscarem qualquer tipo de questão
// Deverão usar ele.

export type QuestionModel = {
	id: number
	question_text: string
	question_type: string
	statement: {
		question_command: string
	}
	alternatives: {
		alternative_1: string 
		alternative_2: string 
		alternative_3: string 
		alternative_4: string | null
		correct_alternative: number
	}
	media: {
		audio_file_path: string | null
		image_file_path: string | null
		text_content: string | null
	} | null
	tags: string[]
}