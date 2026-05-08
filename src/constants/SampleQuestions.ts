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
		question_type: "reading",
		question_text: "ねこは、いまどこにいますか。",
		statement: {
			question_command: "つぎの文章を読んで、質問に答えてください。答えは、１・２・３・４から、いちばんいいものを一つえらんでください。",
		},
		alternatives: {
			alternative_1: "１",
			alternative_2: "２",
			alternative_3: "３",
			alternative_4: "４",
			correct_alternative: 1
		},
		media: {
			audio_file_path: null,
			image_file_path: "/sampleQuestions/images/reading/JT4Y/R12-Q1.png",
			text_content: "Ａ：ねこは、どこへ行きましたか。\nＢ：ねこ…。あ、いすの上でねていますよ。\nＡ：ほんとだ。すこしまえはつくえの下でねていましたが…。"
		},
		tags: [],
  	},
	{
		id: 2,
		question_type: 'reading',
		question_text: 'きのう買ったかさはどんなかさですか。',
		statement: {
			question_command: 'つぎの文章を読んで、質問に答えてください。答えは、１・２・３・４から、いちばんいいものを一つえらんでください。',
		},
		alternatives: {
			alternative_1: '高くておもいです。',
			alternative_2: '安いですが、おもいです。',
			alternative_3: 'かるくてきれいです。',
			alternative_4: 'きれいですが、高いです。',
			correct_alternative: 3,
		},
		media: {
			audio_file_path: null,
			image_file_path: null,
			text_content: 'Ａ：きのうかさを買いました。\nＢ：あ、そのかさですか。きれいなかさですね。高かったですか。\nＡ：いいえ。きょねん買ったのは高くておもかったですが、このかさはかるくていいです。',
		},
		tags: [],
	},
	{
		id: 3,
		question_type: 'reading',
		question_text: '（ア）には何を入れますか。',
		statement: {
			question_command: '（ア） から （ウ） に　なにを　いれますか。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: 'とりますか',
			alternative_2: 'とりましょうか',
			alternative_3: 'とっていますか',
			alternative_4: 'とってくださいませんか',
			correct_alternative: 4,
		},
		media: {
			audio_file_path: null,
			image_file_path: null,
			text_content: 'パク：すみません、あの上にある本を見たいです。（ ア ）。\n店の人：はい、わかりました。（ イ ）。\nパク：あれです。あの『にほんご』と書いてある本です。\n店の人：これですか。\nパク：いいえ、かんじじゃなくてひらがなで『にほんご』と書いてある本です。\n店の人：ああ、これですか。\nパク：はい、それです。それはいくらですか。\n店の人：３０００円です。\nパク：３０００円ですか。ちょっと高いですね。（ウ）すみません。\n店の人：いいえ。またどうぞ。',
		},
		tags: [],
	},
	{
		id: 13,
		question_type: 'reading',
		question_text: '『しつもん』 （ア）には何を入れますか。',
		statement: {
			question_command: '（ア） から （イ） に　なにを　いれますか。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。',
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
			text_content: 'ヤン：もそもし、大山さんですか。ヤンです。\n大山：アメリカにいるヤンさん？おげんきですか。\nヤン：はい。げんきです。大山さん、おたんじょうび、おめでとうございます。\n大山：ああ、ヤンさん、わたしのたんじょうびをまだおぼえていましたか。ありがとうございます。\nヤン：もちろんです。でもことしはいっしょにたんじょうびのパーティーができませんでしたね。もうパーティーをしましたか。\n大山：ええ。きのうかいしゃのともだちとケーキを食べたり、ダンスをしたりしてたのしかったですよ。あしたはかぞくとレストランへ行きます。\nヤン：（ア）\n大山：来月しごとでアメリカへ行きますからヤンさんにもいちどあいたいですね。\nヤン：ほんとうですか。（イ）そのときは電話をください。',
		},
		tags: [],
	},
	{
		id: 17,
		question_type: 'reading',
		question_text: '「１」にはなにをいれますか。',
		statement: {
			question_command: '「１」 から 「４」 に　なにを　いれますか。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。',
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
			text_content: '「うちでこの本をよんでください。すこしむずかしいですが、とても「１」ですから、がんばってください。知らない「２」がはいっていますが、はじめはじしょをひかないでぜんぶ「３」ください。つぎにじしょをひきながらもう「４」よんでください。いいですか。２かいよむんですよ。」',
		},
		tags: [],
	},
	{
		id: 32,
		question_type: 'reading',
		question_text: '([blank]) には何を入れますか。',
		statement: {
			question_command: '([blank]) に　なにを　いれますか。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。',
		},
		alternatives: {
			alternative_1: '本は２９日、ざっしは２２日です。',
			alternative_2: '本は２２日、ざっしは２９日です。',
			alternative_3: '本もざっしも２９日です。',
			alternative_4: '本もざっしも２２日です。',
			correct_alternative: 1,
		},
		media: {
			audio_file_path: null,
			image_file_path: null,
			text_content: '学生：すみません。この本をかりたいです。\nとしょかんの人：この学校の学生ですか。\n学生：はい。\nとしょかんの人：では、はじめにこのかみに名前とじゅうしょと電話ばんごうを書いてぐださい。\n学生：はい。\nとしょかんの人：書きましたか。\n学生：はい。\nとしょかんの人：これはじしょですね。としょかんの中でつかってぐださい。\n学生：はい、わかりました。では、この７さつをかしてぐださい。\nとしょかんの人：ああ、学生は４さつまでです。\n学生：そうですか。では、この３さつはかりません。\nとしょかんの人：わかりました。では、こちらの本は２しゅうかん、ざっしは1しゅうかんでかえしてぐださい。きょうは１５日ですから、([blank])\n学生：はい、わかりました。',
		},
		tags: [],
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