import {
  type AudioSpeechRequest,
  Speechify as SpeechifySDK,
} from '@speechify/api-sdk';

type SpeechifyVoice =
  | 'henry'
  | 'bwyneth'
  | 'carly'
  | 'kristy'
  | 'oliver'
  | 'tasha'
  | 'joe'
  | 'lisa'
  | 'george'
  | 'emily'
  | 'rob'
  | 'russell'
  | 'benjamin'
  | 'michael'
  | 'kim'
  | 'ankit'
  | 'arun'
  | 'carol'
  | 'helen'
  | 'julie'
  | 'linda'
  | 'mark'
  | 'nick'
  | 'elijah'
  | 'beverly'
  | 'collin'
  | 'erin'
  | 'jack'
  | 'jesse'
  | 'ken'
  | 'lindsey'
  | 'monica'
  | 'phil'
  | 'ron'
  | 'stacy'
  | 'archie'
  | 'evelyn'
  | 'freddie'
  | 'harper'
  | 'jacob'
  | 'james'
  | 'mason'
  | 'victoria'
  | 'christina'
  | 'douglas'
  | 'lauren'
  | 'patricia'
  | 'jennifer'
  | 'robert'
  | 'peter'
  | 'jeremy'
  | 'barbara'
  | 'susan'
  | 'charles'
  | 'harold'
  | 'sarah'
  | 'karen'
  | 'anthony'
  | 'donald'
  | 'paul'
  | 'steven'
  | 'andrew'
  | 'kenneth'
  | 'joshua'
  | 'betty'
  | 'margaret'
  | 'kyle'
  | 'edward'
  | 'ronald'
  | 'timothy'
  | 'sandra'
  | 'dorothy'
  | 'jeffrey'
  | 'kimberly'
  | 'donna'
  | 'walter'
  | 'megan'
  | 'richard'
  | 'amanda'
  | 'melissa'
  | 'deborah'
  | 'gary'
  | 'rebecca'
  | 'sharon'
  | 'cynthia'
  | 'kathleen'
  | 'joan'
  | 'shirley'
  | 'angela'
  | 'anna'
  | 'brenda'
  | 'larry'
  | 'keith'
  | 'scott'
  | 'pamela'
  | 'samuel'
  | 'gregory'
  | 'samantha'
  | 'katherine'
  | 'christine'
  | 'frank'
  | 'alexander'
  | 'raymond'
  | 'debra'
  | 'patrick'
  | 'catherine'
  | 'carolyn'
  | 'janet'
  | 'ruth'
  | 'zachary'
  | 'heather'
  | 'diane'
  | 'dennis'
  | 'jerry'
  | 'tyler'
  | 'aaron'
  | 'virginia'
  | 'joyce'
  | 'judith'
  | 'kelly'
  | 'nathan'
  | 'terry'
  | 'carl'
  | 'gerald'
  | 'jaqueline'
  | 'cheryl'
  | 'christian'
  | 'rohit'
  | 'gloria'
  | 'arthur'
  | 'austin'
  | 'sean'
  | 'martha'
  | 'randy'
  | 'ralph'
  | 'roy'
  | 'alan'
  | 'logan'
  | 'willie'
  | 'kathryn'
  | 'frances'
  | 'madison'
  | 'bruce'
  | 'billy'
  | 'jordan'
  | 'bryan'
  | 'dylan'
  | 'vincent'
  | 'eugene'
  | 'janice'
  | 'jean'
  | 'abigail'
  | 'alice'
  | 'bobby'
  | 'julia'
  | 'johnny'
  | 'judy'
  | 'bradley'
  | 'hunter'
  | 'dale'
  | 'howard'
  | 'fred'
  | 'danielle'
  | 'marilyn'
  | 'blake'
  | 'doris'
  | 'denise'
  | 'issac'
  | 'theresa'
  | 'natalie'
  | 'aiden'
  | 'brittany'
  | 'charlotte'
  | 'marie'
  | 'kayla'
  | 'alexis'
  | 'lori'
  | 'landon'
  | 'tiffany'
  | 'marcus'
  | 'martin'
  | 'curtis'
  | 'kathy'
  | 'todd'
  | 'leonard'
  | 'calvin'
  | 'rose'
  | 'ava'
  | 'bonnie'
  | 'peggy'
  | 'edwin'
  | 'don'
  | 'ruby'
  | 'crystal'
  | 'craig'
  | 'norma'
  | 'paula'
  | 'annie'
  | 'shawn'
  | 'lillian'
  | 'robin'
  | 'evan'
  | 'garrette'
  | 'francis'
  | 'danny'
  | 'stanley'
  | 'lucy'
  | 'jeffery'
  | 'herbert'
  | 'lee'
  | 'april'
  | 'anne'
  | 'tammy'
  | 'trevor'
  | 'eleanor'
  | 'regina'
  | 'carrie'
  | 'leah'
  | 'beth'
  | 'cody'
  | 'shane'
  | 'dana'
  | 'allison'
  | 'dawn'
  | 'julian'
  | 'wendy'
  | 'travis'
  | 'florence'
  | 'tracy'
  | 'adrian'
  | 'phillis'
  | 'carole'
  | 'mildred'
  | 'cameron'
  | 'chad'
  | 'connie'
  | 'gladys'
  | 'arlene'
  | 'jana'
  | 'leona'
  | 'miriam'
  | 'lorrie'
  | 'velma'
  | 'eduardo'
  | 'bennie'
  | 'rene'
  | 'ed'
  | 'stuart'
  | 'terrence'
  | 'delbert'
  | 'colin'
  | 'susanne'
  | 'hugo'
  | 'ignacio'
  | 'sheldon'
  | 'josefina'
  | 'corinne'
  | 'lana'
  | 'cherry'
  | 'erick'
  | 'frankie'
  | 'stewart'
  | 'claudette'
  | 'doyle'
  | 'darrel'
  | 'janine'
  | 'simone'
  | 'casey'
  | 'leta'
  | 'rogelio'
  | 'lorraine'
  | 'terence'
  | 'santiago'
  | 'alonzo'
  | 'benny'
  | 'elisa'
  | 'dee'
  | 'bert'
  | 'elbert'
  | 'charmaine'
  | 'roslyn'
  | 'shelley'
  | 'ramiro'
  | 'noel'
  | 'mercedes'
  | 'christie'
  | 'laurel'
  | 'spencer'
  | 'pat'
  | 'dorthy'
  | 'jeanie'
  | 'clare'
  | 'aileen'
  | 'grady'
  | 'deana'
  | 'cornelius'
  | 'cecelia'
  | 'maryann'
  | 'rolando'
  | 'lamar'
  | 'susana'
  | 'katharine'
  | 'clay'
  | 'liza'
  | 'jerri'
  | 'rochelle'
  | 'cathy'
  | 'percy'
  | 'dexter'
  | 'maribel'
  | 'rosemarie'
  | 'bradford'
  | 'kari'
  | 'nikki'
  | 'bernadette'
  | 'eugenia'
  | 'merie'
  | 'darie'
  | 'amon'
  | 'moses'
  | 'concetta'
  | 'irvin'
  | 'rodolfo'
  | 'christi'
  | 'roman'
  | 'janie'
  | 'marcy'
  | 'lindy'
  | 'tommie'
  | 'darnell'
  | 'randal'
  | 'selena'
  | 'shari'
  | 'antoinette'
  | 'timmy'
  | 'darrin'
  | 'margo'
  | 'sherri'
  | 'erika'
  | 'robbie'
  | 'marcella'
  | 'lela'
  | 'winston'
  | 'jeannine'
  | 'brendan'
  | 'christa'
  | 'deloris'
  | 'toby'
  | 'elva'
  | 'van'
  | 'abel'
  | 'myron'
  | 'gracie'
  | 'gwen'
  | 'melba'
  | 'boyd'
  | 'shawna'
  | 'courtney'
  | 'marlena'
  | 'cathie'
  | 'ramesh'
  | 'rita'
  | 'joel'
  | 'derek'
  | 'earl'
  | 'brett'
  | 'ellis'
  | 'ian'
  | 'oscar'
  | 'edna'
  | 'ethel'
  | 'gene'
  | 'shannon'
  | 'sheila'
  | 'dustin'
  | 'ellen'
  | 'hilda'
  | 'ray'
  | 'marjorie'
  | 'sylvia'
  | 'barry'
  | 'melvin'
  | 'thelma'
  | 'cindy'
  | 'miranda'
  | 'bernard'
  | 'carlton'
  | 'juanita'
  | 'darrell'
  | 'erik'
  | 'jeremiah'
  | 'nicolas'
  | 'gordon'
  | 'violet'
  | 'mona'
  | 'glen'
  | 'willis'
  | 'harvey'
  | 'rudolph'
  | 'preston'
  | 'cole'
  | 'june'
  | 'pauline'
  | 'leo'
  | 'earnest'
  | 'devin'
  | 'audrey'
  | 'claire'
  | 'vivian'
  | 'goldie'
  | 'tommy'
  | 'allen'
  | 'glenn'
  | 'wilson'
  | 'jill'
  | 'loretta'
  | 'mabel'
  | 'marsha'
  | 'lillie'
  | 'minnie'
  | 'essie'
  | 'madge'
  | 'viola'
  | 'nellie'
  | 'pearl'
  | 'marvin'
  | 'mae'
  | 'levi'
  | 'lucille'
  | 'hazel'
  | 'nathaniel'
  | 'lydia'
  | 'bertha'
  | 'ursula'
  | 'kay'
  | 'sue'
  | 'dean'
  | 'verna'
  | 'teri'
  | 'edith'
  | 'dan'
  | 'lewis'
  | 'harriett'
  | 'clifford'
  | 'genevieve'
  | 'colleen'
  | 'gilbert'
  | 'patrice'
  | 'jared'
  | 'elaine'
  | 'maureen'
  | 'edmund'
  | 'nina'
  | 'georgia'
  | 'garrett'
  | 'renee'
  | 'bessie'
  | 'leslie'
  | 'max'
  | 'leon'
  | 'fannie'
  | 'lowell'
  | 'veronica'
  | 'vanessa'
  | 'joy'
  | 'jim'
  | 'faith'
  | 'valerie'
  | 'wanda'
  | 'steve'
  | 'naomi'
  | 'miles'
  | 'marcia'
  | 'brent'
  | 'clinton'
  | 'jon'
  | 'marshall'
  | 'roberta'
  | 'alexandra'
  | 'doreen'
  | 'daisy'
  | 'della'
  | 'minerva'
  | 'cedric'
  | 'patsy'
  | 'kerry'
  | 'lena'
  | 'gregg'
  | 'lois'
  | 'kurt'
  | 'lorene'
  | 'susie'
  | 'nora'
  | 'lucinda'
  | 'mathew'
  | 'flora'
  | 'rosie'
  | 'sherman'
  | 'lance'
  | 'darcy'
  | 'mattie'
  | 'madeline'
  | 'sylvester'
  | 'cory'
  | 'anita'
  | 'allan'
  | 'lula'
  | 'nell'
  | 'priscilla'
  | 'kristin'
  | 'rosemary'
  | 'roosevelt'
  | 'geneva'
  | 'jeannette'
  | 'bob'
  | 'esther'
  | 'michele'
  | 'forrest'
  | 'wilbert'
  | 'cathleen'
  | 'jaime'
  | 'dwayne'
  | 'inez'
  | 'alberto'
  | 'lynne'
  | 'maxine'
  | 'wilma'
  | 'taylor'
  | 'angelina'
  | 'hope'
  | 'margie'
  | 'myrtle'
  | 'misty'
  | 'jimmie'
  | 'eunice'
  | 'everett'
  | 'miracle'
  | 'billie'
  | 'leland'
  | 'jackie'
  | 'kristina'
  | 'johnnie'
  | 'isaac'
  | 'bobbie'
  | 'tonya'
  | 'reba'
  | 'kristine'
  | 'amelia'
  | 'cassandra'
  | 'angie'
  | 'maude'
  | 'nichole'
  | 'marguerite'
  | 'justine'
  | 'kelli'
  | 'mandy'
  | 'jeri'
  | 'darla'
  | 'shelia'
  | 'jacquelin'
  | 'cara'
  | 'kellie'
  | 'jolene'
  | 'chelsea'
  | 'autumn'
  | 'glenda'
  | 'lolita'
  | 'jeanne'
  | 'sherrie'
  | 'toni'
  | 'becky'
  | 'jennie'
  | 'jenna'
  | 'leigh'
  | 'cristina'
  | 'blanche'
  | 'clarissa'
  | 'betsy'
  | 'bridget'
  | 'ginger'
  | 'faye'
  | 'candice'
  | 'jaclyn'
  | 'krista'
  | 'marisa'
  | 'gayle'
  | 'meredith'
  | 'angelica'
  | 'rachael'
  | 'candy'
  | 'trisha'
  | 'sandy'
  | 'holly'
  | 'alicia'
  | 'melinda'
  | 'geraldine'
  | 'tara'
  | 'isabel'
  | 'adrienne'
  | 'terra'
  | 'rubye'
  | 'antonia'
  | 'guadalupe'
  | 'cheri'
  | 'janelle'
  | 'constance'
  | 'robyn'
  | 'jodi'
  | 'krystal'
  | 'rosalie'
  | 'deanna'
  | 'debbie'
  | 'josie'
  | 'ronda'
  | 'paulette'
  | 'belinda'
  | 'alton'
  | 'rudy'
  | 'kelvin'
  | 'damon'
  | 'johnathan'
  | 'cesar'
  | 'ira'
  | 'horace'
  | 'grant'
  | 'lionel'
  | 'wilbur'
  | 'jake'
  | 'jody'
  | 'rickey'
  | 'lester'
  | 'pablo'
  | 'neal'
  | 'mack'
  | 'orlando'
  | 'alfonso'
  | 'ernesto'
  | 'rex'
  | 'lynn'
  | 'matt'
  | 'lyle'
  | 'kristopher'
  | 'hubert'
  | 'kenny'
  | 'doug'
  | 'sammy'
  | 'homer'
  | 'wendell'
  | 'woodrow'
  | 'felipe'
  | 'garry'
  | 'pete'
  | 'marco'
  | 'rufus'
  | 'owen'
  | 'bryant'
  | 'abraham'
  | 'irving'
  | 'jermaine'
  | 'julius'
  | 'marty'
  | 'alejandro'
  | 'carmen'
  | 'carlos'
  | 'celia'
  | 'lucas'
  | 'luiza'
  | 'diogo'
  | 'agueda'
  | 'raphael'
  | 'elise'
  | 'frederick'
  | 'andra'
  | 'frederik'
  | 'freja'
  | 'daan'
  | 'lotte'
  | 'eino'
  | 'helmi'
  | 'jakob'
  | 'frida'
  | 'kostas'
  | 'eleni'
  | 'lazzaro'
  | 'alessia'
  | 'mart'
  | 'liis'
  | 'trinh'
  | 'thoa'
  | 'lesya'
  | 'taras'
  | 'mikhail'
  | 'olga'
  | 'axel'
  | 'ebba'
  | 'hemant'
  | 'priya'
  | 'aicha'
  | 'ismail'
  | 'moshe'
  | 'inbar'
  | 'gil'
  | 'lital'
  | 'yusuf'
  | 'elif'
  | 'dominika'
  | 'michal';

export class Speechify {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.SPEECHIFY_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('SPEECHIFY_API_KEY is not set');
    }
  }

  private createProvider() {
    return new SpeechifySDK({ apiKey: this.apiKey });
  }

  /**
   * Creates a text-to-speech synthesis function using Speechify TTS
   * @param {AudioSpeechRequest["model"]} model - The model to use for synthesis. Defaults to 'simba-multilingual'
   * @param {SpeechifyVoice} voice - The voice to use for synthesis. Defaults to 'george'
   * @param {Omit<AudioSpeechRequest, 'model' | 'voiceId' | 'input'>} properties - Additional properties for the synthesis request
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    model: AudioSpeechRequest['model'] = 'simba-multilingual',
    voice: SpeechifyVoice = 'george',
    properties?: Omit<AudioSpeechRequest, 'model' | 'voiceId' | 'input'>
  ) {
    const provider = this.createProvider();

    return async (prompt: string) => {
      const response = await provider.audioGenerate({
        input: prompt,
        voiceId: voice,
        model: model,
        audioFormat: 'mp3',
        ...properties,
      });

      const file = new File([response.audioData], 'speech.mp3', {
        type: 'audio/mpeg',
      });

      return file;
    };
  }
}
