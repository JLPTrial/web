import {
	grammarQuestions,
	listeningQuestions,
	readingQuestions,
} from '../constants/SampleQuestions'

export default function Question() {
	const example = grammarQuestions[0]
	const readingExample = readingQuestions[0]
	const listeningExample = listeningQuestions[0]
    
	return (
		<div className='space-y-5'>
			<div className='bg-yellow-500 rounded-md p-2'>
				<h2>Exemplo de questão simples</h2>
				<p>問題 １：   {example.statement.question_command}</p>
				<br></br>
				<p>{example.question_text}</p>

				<label className='flex items-center gap-2'><input type="radio" name='sample'/><p>{example.alternatives.alternative_1}</p></label>
				<label className='flex items-center gap-2'><input type="radio" name='sample'/><p>{example.alternatives.alternative_2}</p></label>
				<label className='flex items-center gap-2'><input type="radio" name='sample'/><p>{example.alternatives.alternative_3}</p></label>
				<label className='flex items-center gap-2'><input type="radio" name='sample'/><p>{example.alternatives.alternative_4}</p></label>

				<p>Tags: {example.tags.join(" - ")}</p>
			</div>

			<div className='bg-yellow-500 rounded-md p-2'>
				<h2>Exemplo de questão reading com imagem</h2>
				<p>問題 １：   {readingExample.statement.question_command}</p>
				<br></br>
				<p>{readingExample.question_text}</p>
				<img src={readingExample.media.image_file_path}  />

                <p className='whitespace-pre-line'>{readingExample.media.text_content}</p>

				<label className='flex items-center gap-2'><input type="radio" name='sample-reading'/><p>{readingExample.alternatives.alternative_1}</p></label>
				<label className='flex items-center gap-2'><input type="radio" name='sample-reading'/><p>{readingExample.alternatives.alternative_2}</p></label>
				<label className='flex items-center gap-2'><input type="radio" name='sample-reading'/><p>{readingExample.alternatives.alternative_3}</p></label>
				<label className='flex items-center gap-2'><input type="radio" name='sample-reading'/><p>{readingExample.alternatives.alternative_4}</p></label>
			</div>

			<div className='bg-yellow-500 rounded-md p-2'>
				<h2>Exemplo de questão listening com audio e imagem</h2>
				<p>問題 １：   {listeningExample.statement.question_command}</p>
				
                <br></br>

				<p>{listeningExample.question_text}</p>

				<img src={listeningExample.media.image_file_path} />
				<audio src={listeningExample.media.audio_file_path} controls />

				<label className='flex items-center gap-2'><input type="radio" name='sample-listening'/><p>{listeningExample.alternatives.alternative_1}</p></label>
				<label className='flex items-center gap-2'><input type="radio" name='sample-listening'/><p>{listeningExample.alternatives.alternative_2}</p></label>
				<label className='flex items-center gap-2'><input type="radio" name='sample-listening'/><p>{listeningExample.alternatives.alternative_3}</p></label>
				<label className='flex items-center gap-2'><input type="radio" name='sample-listening'/><p>{listeningExample.alternatives.alternative_4}</p></label>

				<p>Tags: {listeningExample.tags.join(" - ")}</p>
			</div>
		</div>
	)
}
