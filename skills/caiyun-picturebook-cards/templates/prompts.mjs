/**
 * 第三篇：「消费降级时代，普通人如何合理消费」14 页分镜 prompt
 * 毛选概念映射：以退为进（消费降级=主动战略）/ 没有调查就没有发言权（记账）/
 *               抓主要矛盾（钱花刀刃上）/ 集中优势兵力（一件好物）/ 自己动手丰衣足食 /
 *               攒钱是持久战、不打无准备之仗（存款=根据地）
 * 贯穿元素：存钱罐军团（第三篇的"角色锚点"）、奶茶/包裹/账本等消费符号
 */

const STYLE =
  'Cute polished storybook illustration with soft colored-pencil shading texture, ' +
  'rounded chibi character design with clean simple faces, big sparkling eyes, round pink blush, ' +
  'thin hand-drawn outlines, warm muted earthy palette, warm cream paper background, ' +
  'cozy douyin picture-book comic style. Clean and adorable, NOT sketchy, NOT 3D, NOT photo.';

const HEROINE =
  'the girl protagonist: black hair in two high twin-tail pigtails tied with small red ribbons, ' +
  'wearing a loose grass-green short-sleeve T-shirt and black shorts, ' +
  'round pink blush on cheeks, cute expressive face';

const NEGATIVE =
  'Absolutely no text, no letters, no numbers, no symbols, no speech bubbles, no labels, ' +
  'no watermark, no signature. Pure illustration only. Vertical composition 1152x1536.';

const S = (s) => `${STYLE} ${s} ${NEGATIVE}`;

export const PROMPTS = [
  {
    id: 'page-01',
    file: 'page-01.jpg',
    prompt: S(
      `Scene: a lively shopping street with sale banners, balloons and a crowd waving blank discount signs, ` +
      `all slightly blurred behind. In the calm foreground ${HEROINE} takes one confident step backward, ` +
      `hugging a big smiling piggy bank to her chest with both arms, eyes closed with a serene determined smile, ` +
      `like wisely stepping out of the frenzy. Warm evening light, strong calm-versus-chaos contrast.`,
    ),
  },
  {
    id: 'page-02',
    file: 'page-02.jpg',
    prompt: S(
      `Scene: a cute bubble-tea shop counter. ${HEROINE} stands before the counter staring up at ` +
      `a big blank menu board, holding a few small coins in her open palm, a big sweat drop on her head, ` +
      `hesitant torn expression, one foot already stepping back. ` +
      `A patient cashier stands behind the counter with cups and a sealing machine, pastel shop interior.`,
    ),
  },
  {
    id: 'page-03',
    file: 'page-03.jpg',
    prompt: S(
      `Scene: a storage corner stacked with towering piles of unopened delivery cardboard boxes. ` +
      `${HEROINE} kneels opening one box and finds it stuffed with endless packs of paper towels, ` +
      `blank stunned face with a tiny floating question doodle, faint dust sparkles around, ` +
      `stacks towering over her, comedic overload mood.`,
    ),
  },
  {
    id: 'page-04',
    file: 'page-04.jpg',
    prompt: S(
      `Scene: a gloomy room with one burned-out lightbulb hanging above. ${HEROINE} sits on the floor ` +
      `wrapped in a thin blanket eating plain instant noodles from a bowl, sad teary eyes, ` +
      `beside her a wallet shut tight with a tiny chain and padlock. Everything gray and joyless, ` +
      `over-thrift misery mood, gentle humor.`,
    ),
  },
  {
    id: 'page-05',
    file: 'page-05.jpg',
    prompt: S(
      `Scene: a warm-lit desk at night. ${HEROINE} wears round glasses and studies a long paper receipt ` +
      `spread across the desk with a calculator in one hand, her eyes going wide in sudden realization, ` +
      `an open notebook whose cover has a small gold star, scattered receipts, a mug, moonlit window, ` +
      `detective discovering-the-truth mood.`,
    ),
  },
  {
    id: 'page-06',
    file: 'page-06.jpg',
    prompt: S(
      `Scene: split composition front and back. Foreground: ${HEROINE} happily eating a simple warm ` +
      `homemade meal at a small tidy table with a checkered cloth, glowing with contentment. ` +
      `Background on a shelf: fancy glossy paper shopping bags gathering dust with a little cobweb doodle, ` +
      `contrast of warm real life versus cold vanity, cozy evening light.`,
    ),
  },
  {
    id: 'page-07',
    file: 'page-07.jpg',
    prompt: S(
      `Scene: minimal chapter-card composition. Like a tiny general, ${HEROINE} leans over ` +
      `a table studying a hand-drawn town map model, planting three small red flags on key spots, ` +
      `one flag by a tiny house, one by a heart shape, one by a book shape, all shapes blank without text, ` +
      `spotlight from above, strategic focused mood, clean background.`,
    ),
  },
  {
    id: 'page-08',
    file: 'page-08.jpg',
    prompt: S(
      `Scene: a bright tidy room. ${HEROINE} happily drops gold coins into two big piggy banks on the shelf: ` +
      `one piggy bank shaped like an apple, the other shaped like a stack of books, both smiling. ` +
      `With her other hand she tosses a fancy ribbon gift box into a corner bin. ` +
      `Clear priority symbolism, cheerful decisive mood, clean composition.`,
    ),
  },
  {
    id: 'page-09',
    file: 'page-09.jpg',
    prompt: S(
      `Scene: split contrast composition. Left side: a sad pile of cheap broken trinkets, ` +
      `cracked plastic toys, tangled cables, faded trinkets. Right side: ${HEROINE} kneels ` +
      `lovingly holding up ONE beautiful shiny well-crafted leather boot with both hands, ` +
      `the boot glowing softly with sparkles, her eyes sparkling. ` +
      `Quality-versus-quantity message, warm light on the right, dull gray on the left.`,
    ),
  },
  {
    id: 'page-10',
    file: 'page-10.jpg',
    prompt: S(
      `Scene: minimal chapter-card composition. ${HEROINE} wears a cute apron and raises a spatula ` +
      `like a heroic sword with one hand and a frying pan in the other, dynamic pose, ` +
      `fresh vegetables (tomatoes, eggs, green onions) floating around her in comic style, ` +
      `cozy kitchen background, energetic self-sufficient mood.`,
    ),
  },
  {
    id: 'page-11',
    file: 'page-11.jpg',
    prompt: S(
      `Scene: a cozy kitchen. ${HEROINE} proudly presents a big plate of homemade cooking — ` +
      `rice topped with a smiley fried egg face and little vegetables — steam swirling up, ` +
      `her smile huge and proud, a small cat on the floor sniffing hopefully. ` +
      `In the far corner, a neglected stack of empty delivery boxes. Warm proud mood.`,
    ),
  },
  {
    id: 'page-12',
    file: 'page-12.jpg',
    prompt: S(
      `Scene: minimal chapter-card composition in morning light. A row of piggy banks stands ` +
      `in neat line like little soldiers on a shelf, different sizes from small to large, ` +
      `the biggest one wears a tiny general cap. ${HEROINE} stands before them saluting seriously, ` +
      `one hand at her forehead, the other holding a gold coin, adorable disciplined mood.`,
    ),
  },
  {
    id: 'page-13',
    file: 'page-13.jpg',
    prompt: S(
      `Scene: payday at a tidy desk with a wall calendar behind (blank grid, one day circled in red). ` +
      `${HEROINE} drops one big shiny gold coin into the biggest smiling piggy bank with both hands, ` +
      `determined happy face, a neat line of smaller coins waiting their turn on the desk like a queue. ` +
      `Pay-yourself-first ritual mood, warm morning light.`,
    ),
  },
  {
    id: 'page-14',
    file: 'page-14.jpg',
    prompt: S(
      `Scene: a cozy warm room in the evening. ${HEROINE} curls up in a soft armchair holding ` +
      `a steaming mug with both hands, a small cat sleeping curled on her lap, ` +
      `a tidy bookshelf, a warm floor lamp, a small happy piggy bank on the side table. ` +
      `Her eyes closed with a content gentle smile. Rich-in-spirit simple-life ending mood, ` +
      `warm golden tones.`,
    ),
  },
];

export const GEN_CONFIG = {
  model: 'cogview-4',
  size: '1152x1536',
  endpoint: 'https://open.bigmodel.cn/api/paas/v4/images/generations',
};
