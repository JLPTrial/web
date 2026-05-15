type QuestionModel = {
	id: number
	question_type: string
	question_text: string
	statement: {
		question_command: string
	}
	alternatives: {
		alternative_1: string | null
		alternative_2: string | null
		alternative_3: string | null
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

export const grammarQuestions: QuestionModel[] = [
	{
		id: 1,
		question_type: 'grammar',
		question_text: 'まいにち　しんぶん　（[blank]）　読[よ]みます。',
		statement: {
			question_command: '（[blank]）　に　なに　を　いれますか。１・２・３・４　から　いちばん　いい　もの　を　ひとつ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: 'へ',
			alternative_2: 'を',
			alternative_3: 'に',
			alternative_4: 'が',
			correct_alternative: 2,
		},
		media: null,
		tags: ['Gramática textual', 'Outra tag qualquer'],
	},
	{
		id: 106,
		question_type: 'grammar',
		question_text: '「１」に　何[なん]　を　入[い]れますか。',
		statement: {
			question_command: '「１」から「５」に　何[なん]　を　入[い]れますか。文章[ぶんしょう]　の　意味[いみ]　を　考[かんが]えて、１・２・３・４　から　いちばん　いい　もの　を　一[ひと]つ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: '日本[にっぽん]で',
			alternative_2: '日本[にっぽん]に',
			alternative_3: '日本[にっぽん]は',
			alternative_4: '日本[にっぽん]へ',
			correct_alternative: 1,
		},
		media: null,
		tags: ['Forma gramatical', 'Construção de frases', 'Contexto'],
	},
	{
		id: 201,
		question_type: 'grammar',
		question_text: 'ヤンさん　は　この　つくえ　を[underline_blank][underline_blank][star_underline_blank][underline_blank]よ。',
		statement: {
			question_command: '[star_underline_blank]に　入[はい]る　もの　は　どれですか。１・２・３・４　から　いちばん　いい　もの　を　一[ひと]つ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: '買[か]った',
			alternative_2: '１０００円[えん]',
			alternative_3: 'で',
			alternative_4: 'んです',
			correct_alternative: 1,
		},
		media: null,
		tags: ['Gramática textual', 'Construção de frases'],
	},
]

export const kanjiQuestions: QuestionModel[] = [
	{
		id: 1,
		question_type: 'kanji',
		question_text: 'しけん　は　{来月}　の　七月八日[しちがつようか]、木[もく]よう日[び]、九時[くじ]　から　です。',
		statement: {
			question_command: '[underline_blank]　の　ことばは　ひらがなで　どう　かきますか。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: 'くげつ',
			alternative_2: 'らいがつ',
			alternative_3: 'くがつ',
			alternative_4: 'らいげつ',
			correct_alternative: 4,
		},
		media: null,
		tags: ['Leitura de Kanji', 'Uso'],
	},
	{
		id: 16,
		question_type: 'kanji',
		question_text: 'はは　は　{まいにち}、だいがく　の　としょかん　で　はたらいています。',
		statement: {
			question_command: '[underline_blank]　の　ことばは　どう　かきますか。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: '宙日',
			alternative_2: '週日',
			alternative_3: '中日',
			alternative_4: '毎日',
			correct_alternative: 4,
		},
		media: null,
		tags: ['Transcrição'],
	},
]

export const listeningQuestions: QuestionModel[] = [
	{
		id: 1,
		question_type: 'listening',
		question_text: '女[おんな]　の　人[ひと]　と　男[おとこ]　の　人[ひと]　が　話[はな]しています。女[おんな]　の　人[ひと]　の　コート　は　どれ　です　か。',
		statement: {
			question_command: 'まず　しつもん　を　聞[き]いて　ください。それから　話[はなし]　を　聞[き]いて、もんだいようしの　１　から　４　の　中[なか]　から、いちばん　いい　もの　を　一[ひと]つ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: '1',
			alternative_2: '2',
			alternative_3: '3',
			alternative_4: '4',
			correct_alternative: 2,
		},
		media: {
			audio_file_path: '/sampleQuestions/audios/listening/JT4Y/L1-Q1.mp3',
			image_file_path: '/sampleQuestions/images/listening/JT4Y/L1-Q1.png',
			text_content: 'Ａ：じゃ、私は先に帰ります。\nＢ：そうですか。じゃ、コートを、山田さんのコートはどれですか。\nＡ：それです。その白くて、長いのです。\nＢ：あ、これですか。\nＡ：いいえ。そのポケットがないほうです。\n女の人のコートはどれですか。',
		},
		tags: ['Compreensão de Pontos'],
	},
	{
		id: 6,
		question_type: 'listening',
		question_text: '女[おんな]　の　人[ひと]　と　男[おとこ]　の　人[ひと]　が　話[はな]しています。男[おとこ]　の　人[ひと]　は　冷蔵庫[れいぞうこ]　に　何[なに]　を　入[い]れます　か。',
		statement: {
			question_command: 'まず　しつもん　を　聞[き]いて　ください。そのあと、もんだいようし　を　見[み]て　ください。読[よ]む　時間[じかん]　が　あります。それから　話[はなし]　を　聞[き]いて、もんだいようし　の　１　から　４　の　中[なか]　から、いちばん　いい　もの　を　一[ひと]つ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: 'くだもの',
			alternative_2: 'ビール',
			alternative_3: 'くだもの・ビール',
			alternative_4: 'くだもの・ビール・おかし',
			correct_alternative: 3,
		},
		media: {
			audio_file_path: '/sampleQuestions/audios/listening/JT4Y/L2-Q1.mp3',
			image_file_path: null,
			text_content: 'Ａ：買い物、ありがとう。果物は、冷蔵庫に入れてください。\nＢ：お菓子は、テーブルの上でいいですか。\nＡ：はい。あ、ビールもテーブルの上に置いてください。\nＢ：そうですか。でも、温いビールはおいしくないでしょう。\nＡ：そうですよね。パーティーまで時間がありますね。じゃあ、一緒に入れてく\nださい。\n男の人は冷蔵庫に何を入れますか。',
		},
		tags: ['Compreensão de Pontos'],
	},
	{
		id: 50,
		question_type: 'listening',
		question_text: 'お国[くに]　はは　どちら　です　か。',
		statement: {
			question_command: 'え　など　が　ありません。まず　文[ぶん]　を　聞[き]いて　ください。それから、その　返事[へんじ]　を　聞[き]いて、１　から　３　の　中[なか]　から、いちばん　いい　もの　を　一[ひと]つ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: '1',
			alternative_2: '2',
			alternative_3: '3',
			alternative_4: null,
			correct_alternative: 2,
		},
		media: {
			audio_file_path: '/sampleQuestions/audios/listening/JT4Y/L37-Q1.mp3',
			image_file_path: null,
			text_content: '１、 あちらです。\n２、 アメリカです。\n３、 部屋です。',
		},
		tags: ['Resposta Imediata', 'Expressões Faladas'],
	},
	{
		id: 63,
		question_type: 'listening',
		question_text: 'レストラン　で　お店[みせ]　の　人[ひと]　を　呼[よ]びます。なんと　言[い]います　か。',
		statement: {
			question_command: 'え　を　見[み]ながら　しつもん　を　聞[き]いて　ください。 （やじるし）　の　人[ひと]　は　何[なん]と　言[い]います　か。１　から　３　の　中[なか]　から、いちばん　いい　もの　を　一[ひと]つ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: '1',
			alternative_2: '2',
			alternative_3: '3',
			alternative_4: null,
			correct_alternative: 3,
		},
		media: {
			audio_file_path: '/sampleQuestions/audios/listening/JT4Y/L41-Q1.mp3',
			image_file_path: '/sampleQuestions/images/listening/JT4Y/L41-Q1.png',
			text_content: '１、 いらっしゃいませ。\n２、 しつれいしました。\n３、 すみません。',
		},
		tags: ['Resposta Imediata', 'Expressões Faladas'],
	},
]

export const readingQuestions: QuestionModel[] = [
	{
		id: 1,
		question_type: 'reading',
		question_text: 'ねこ　は、　いま　どこ　に　います　か。',
		statement: {
			question_command: 'つぎ　の　文章[ぶんしょう]　を　読[よ]んで、　質問[しつもん]　に　答[こた]えてください。　答[こた]え　は、　１・２・３・４　から、　いちばん　いい　もの　を　一[ひと]つ　えらんでください。',
		},
		alternatives: {
			alternative_1: '１',
			alternative_2: '２',
			alternative_3: '３',
			alternative_4: '４',
			correct_alternative: 1
		},
		media: {
			audio_file_path: null,
			image_file_path: '/sampleQuestions/images/reading/JT4Y/R12-Q1.png',
			text_content: 'Ａ：ねこ　は、　どこ　へ　行[い]きました　か。\nＢ：ねこ　…。　あ、　いす　の　上[うえ]　で　ねています　よ。\nＡ：ほんとう　だ。　すこし　まえ　は　つくえ　の　下[した]　で　ねていましたが　…。'
		},
		tags: ['Extração de informação', 'Entendimento de Contexto (Textos curtos)'],
  	},
	{
		id: 2,
		question_type: 'reading',
		question_text: 'きのう　買[か]った　かさ　は　どんな　かさ　です　か。',
		statement: {
			question_command: 'つぎ　の　文章[ぶんしょう]　を　読[よ]んで、　質問[しつもん]　に　答[こた]えてください。　答[こた]え　は、　１・２・３・４　から、　いちばん　いい　もの　を　一[ひと]つ　えらんでください。',
		},
		alternatives: {
			alternative_1: '高[たか]くて　おもいです。',
			alternative_2: '安[やす]いですが、　おもいです。',
			alternative_3: 'かるくて　きれい　です。',
			alternative_4: 'きれい　ですが、　高[たか]いです。',
			correct_alternative: 3,
		},
		media: {
			audio_file_path: null,
			image_file_path: null,
			text_content: 'Ａ：きのう　かさ　を　買[か]いました。\nＢ：あ、　その　かさ　です　か。　きれいな　かさ　です　ね。　高[たか]かったです　か。\nＡ：いいえ。　きょねん　買[か]った　の　は　高[たか]くて　おもかったですが、　この　かさ　は　かるくて　いいです。',
		},
		tags: ['Extração de informação', 'Entendimento de Contexto (Textos curtos)'],
	},
	{
		id: 3,
		question_type: 'reading',
		question_text: '『しつもん』　（ア）　に　は　何[なに]　を　入[い]れます　か。',
		statement: {
			question_command: '（ア）　から　（イ）　に　なに　を　いれます　か。　１・２・３・４　から　いちばん　いい　もの　を　ひとつ　えらんでください。',
		},
		alternatives: {
			alternative_1: 'そうでした',
			alternative_2: 'そうですか',
			alternative_3: 'そうしましょう',
			alternative_4: 'そうします',
			correct_alternative: 2,
		},
		media: {
			audio_file_path: null,
			image_file_path: null,
			text_content: 'ヤン：もし　もし、　大山[おおやま]さん　です　か。　ヤン　です。\n大山[おおやま]：アメリカ　に　いる　ヤンさん？　お　げんき　です　か。\nヤン：はい。　げんき　です。　大山[おおやま]さん、　おたんじょうび、　おめでとう　ございます。\n大山[おおやま]：ああ、　ヤンさん、　わたし　の　たんじょうび　を　まだ　おぼえていました　か。　ありがとう　ございます。\nヤン：もちろん　です。　でも　ことし　は　いっしょに　たんじょうび　の　パーティー　が　できませんでした　ね。　もう　パーティー　を　しました　か。\n大山[おおやま]：ええ。　きのう　かいしゃ　の　ともだち　と　ケーキ　を　食[た]べたり、　ダンス　を　したり　して　たのしかったです　よ。　あした　は　かぞく　と　レストラン　へ　行[い]きます。\nヤン：（ア）\n大山[おおやま]：来月[らいげつ]　しごと　で　アメリカ　へ　行[い]きますから、　ヤンさん　に　も　いちど　あいたいです　ね。\nヤン：ほんとう　です　か。　（イ）　その　とき　は　電話[でんわ]　を　ください。',
		},
		tags: ['Entendimento de Contexto (Textos longos)'],
	},
	{
		id: 17,
		question_type: 'reading',
		question_text: '「１」　に　は　なに　を　いれます　か。',
		statement: {
			question_command: '「１」　から　「４」　に　なに　を　いれます　か。　１・２・３・４　から　いちばん　いい　もの　を　ひとつ　えらんでください。',
		},
		alternatives: {
			alternative_1: 'おもしろい',
			alternative_2: 'つまらない',
			alternative_3: 'やさしい',
			alternative_4: 'むずかしい',
			correct_alternative: 1,
		},
		media: {
			audio_file_path: null,
			image_file_path: null,
			text_content: '「うち　で　この　本[ほん]　を　よんでください。　すこし　むずかしいですが、　とても　「１」　ですから、　がんばってください。　知[し]らない　「２」　が　はいっていますが、　はじめ　は　じしょ　を　ひかないで　ぜんぶ　「３」　ください。　つぎ　に　じしょ　を　ひきながら　もう　「４」　よんでください。　いいです　か。　２かい　よむんです　よ。」',
		},
		tags: ['Entendimento de Contexto (Textos curtos)'],
	},
	{
		id: 32,
		question_type: 'reading',
		question_text: '([blank])　に　は　何[なに]　を　入[い]れます　か。',
		statement: {
			question_command: '([blank])　に　なに　を　いれます　か。　１・２・３・４　から　いちばん　いい　もの　を　ひとつ　えらんでください。',
		},
		alternatives: {
			alternative_1: '本[ほん]　は　２９日[にち]、　ざっし　は　２２日[にち]　です。',
			alternative_2: '本[ほん]　は　２２日[にち]、　ざっし　は　２９日[にち]　です。',
			alternative_3: '本[ほん]　も　ざっし　も　２９日[にち]　です。',
			alternative_4: '本[ほん]　も　ざっし　も　２２日[にち]　です。',
			correct_alternative: 1,
		},
		media: {
			audio_file_path: null,
			image_file_path: null,
			text_content: '学生[がくせい]：すみません。　この　本[ほん]　を　かりたいです。\nとしょかん　の　人[ひと]：この　学校[がっこう]　の　学生[がくせい]　です　か。\n学生[がくせい]：はい。\nとしょかん　の　人[ひと]：では、　はじめ　に　この　かみ　に　名前[なまえ]　と　じゅうしょ　と　電話[でんわ]　ばんごう　を　書[か]いて　ください。\n学生[がくせい]：はい。\nとしょかん　の　人[ひと]：書[か]きました　か。\n学生[がくせい]：はい。\nとしょかん　の　人[ひと]：これ　は　じしょ　です　ね。　としょかん　の　中[なか]　で　つかって　ください。\n学生[がくせい]：はい、　わかりました。　では、　この　７さつ　を　かして　ください。\nとしょかん　の　人[ひと]：ああ、　学生[がくせい]　は　４さつ　までです。\n学生[がくせい]：そう　です　か。　では、　この　３さつ　は　かりません。\nとしょかん　の　人[ひと]：わかりました。　では、　こちら　の　本[ほん]　は　２しゅうかん、　ざっし　は　１しゅうかん　で　かえしてください。　きょう　は　１５日[にち]　ですから、　([blank])\n学生[がくせい]：はい、　わかりました。',
		},
		tags: ['Entendimento de Contexto (Textos longos)'],
	},
]

export const vocabularyQuestions: QuestionModel[] = [
	{
		id: 1,
		question_type: 'vocabulary',
		question_text: '（[blank]）、　えいが　を　みにいきませんか？',
		statement: {
			question_command: '（[blank]）に　なにを　いれますか。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: 'ゆうべ',
			alternative_2: 'きのう',
			alternative_3: 'あした',
			alternative_4: 'おととい',
			correct_alternative: 3,
		},
		media: null,
		tags: ['Uso da Língua'],
	},
	{
		id: 71,
		question_type: 'vocabulary',
		question_text: '{リーさん　は　にほんご　を　ならっています。}',
		statement: {
			question_command: '[underline_blank]　の　ぶんと　だいたい　おなじ　いみの　ぶんが　あります。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: 'リーさん　は　にほんご　を　いれています。',
			alternative_2: 'リーさん　は　にほんご　を　おしえています。',
			alternative_3: 'リーさん　は　にほんご　を　やめています。',
			alternative_4: 'リーさん　は　にほんご　を　べんきょうしています。',
			correct_alternative: 4,
		},
		media: null,
		tags: ['Regra de Contexto'],
	},
]