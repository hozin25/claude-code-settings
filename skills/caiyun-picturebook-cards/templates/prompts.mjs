/**
 * 第四篇：「如何对抗孤独——毛选的答案是群众路线」14 页分镜 prompt
 * 历史案例页（星星之火/井冈山群众工作/半条被子）：图内不出现军装、不出现任何文字符号，
 * 用蜡烛、红旗、挑水、剪被子等符号语言规避敏感与乱码。
 * 新增贯穿符号：烛光（星星之火）、小红旗（根据地）、暖光门缝（到群众中去）。
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
      `Scene: a quiet bedroom at dusk. ${HEROINE} stands by a big window holding a small red flag, ` +
      `gazing at the distant scattered warm lights of a town waking up below the hills. ` +
      `Her room is dim and quiet, the outside lights warm and inviting, thoughtful mood, ` +
      `clean simple composition.`,
    ),
  },
  {
    id: 'page-02',
    file: 'page-02.jpg',
    prompt: S(
      `Scene: late night. ${HEROINE} slumps at her desk staring down at a glowing phone in her hands, ` +
      `blue light on her sad face. Around her head float many small dim gray circles like distant ` +
      `unlit windows, only one tiny warm food delivery box icon lit among them. ` +
      `Melancholy quiet mood, clean dark background.`,
    ),
  },
  {
    id: 'page-03',
    file: 'page-03.jpg',
    prompt: S(
      `Scene: just after coming home. ${HEROINE} slides down to sit on the floor against the closed door, ` +
      `knees pulled up, bag still on the floor beside her, a thin line of warm light leaking through ` +
      `the door crack contrasting the dim quiet room, muted lonely mood.`,
    ),
  },
  {
    id: 'page-04',
    file: 'page-04.jpg',
    prompt: S(
      `Scene: a living room with curtains drawn in daytime. ${HEROINE} lies sprawled on the sofa ` +
      `holding her phone loosely above her face, above her head a hand-drawn doodle of a battery ` +
      `outline with only a tiny red sliver of charge left, blanket half fallen, ` +
      `drained low-energy mood, gentle humor.`,
    ),
  },
  {
    id: 'page-05',
    file: 'page-05.jpg',
    prompt: S(
      `Scene: a dark cozy corner. ${HEROINE} sits curled up inside a big translucent soap-bubble ` +
      `that separates her from a warm blurred gathering of silhouettes in the background. ` +
      `From inside the bubble, her own hand reaches up pressing a finger against the bubble wall, ` +
      `a small crack of golden light spreading from her fingertip. Hopeful turning-point mood.`,
    ),
  },
  {
    id: 'page-06',
    file: 'page-06.jpg',
    prompt: S(
      `Scene: darkness with a vast starry sky. Close composition: ${HEROINE} cups a single lit candle ` +
      `with both hands, the small flame lighting up her hopeful half-smiling face, ` +
      `far behind her a few faint stars and the silhouette of a great mountain under a tiny sunrise glow, ` +
      `quiet brave mood, strong light-and-dark contrast.`,
    ),
  },
  {
    id: 'page-07',
    file: 'page-07.jpg',
    prompt: S(
      `Scene: minimal chapter-card composition at warm night. On a small grassy clearing, ` +
      `${HEROINE} kneels setting up a tiny camp: a little orange tent, a small red flag on a pole, ` +
      `a campfire with a kettle hanging over it, fireflies around, ` +
      `deep blue night sky with soft stars, cozy building-a-home mood.`,
    ),
  },
  {
    id: 'page-08',
    file: 'page-08.jpg',
    prompt: S(
      `Scene: a sunny village path. ${HEROINE} carries two full water buckets hanging from ` +
      `a wooden shoulder pole, walking toward a cottage where a smiling old granny waits ` +
      `offering a cup of tea, laundry lines and vegetable patches nearby, ` +
      `warm helpful-chores mood, gentle rural details.`,
    ),
  },
  {
    id: 'page-09',
    file: 'page-09.jpg',
    prompt: S(
      `Scene: ${HEROINE} pushes open her door from the dim hallway: outside is a lively warm street ` +
      `with lanterns, small food stalls and strolling silhouettes, golden light pouring in past her, ` +
      `her face lit up with surprise and hope, one foot stepping forward. ` +
      `Strong dark-to-light contrast, inviting mood.`,
    ),
  },
  {
    id: 'page-10',
    file: 'page-10.jpg',
    prompt: S(
      `Scene: an office corner. Shy ${HEROINE} offers a small plate of homemade snacks to ` +
      `a surprised delighted coworker, a tiny heart doodle floating between them, ` +
      `the coworker clapping hands in joy. Warm daylight, first-step courage mood, clean two-person scene.`,
    ),
  },
  {
    id: 'page-11',
    file: 'page-11.jpg',
    prompt: S(
      `Scene: a long wooden table in a dim cozy space. ${HEROINE} lights the first candle with a match, ` +
      `and the flame is jumping from candle to candle lighting up a whole row, ` +
      `warm silhouettes of friends gathering around the growing glow, ` +
      `fire spreading like little stars, warm hopeful gathering mood.`,
    ),
  },
  {
    id: 'page-12',
    file: 'page-12.jpg',
    prompt: S(
      `Scene: split composition. Bright side: ${HEROINE} waters a small green sprout in a pot with ` +
      `a tiny watering can, the sprout lifting happy little leaves in sunlight. ` +
      `Gray side: another identical pot with a wilted drooping sprut nobody waters, in shadow. ` +
      `Clear care-versus-neglect symbolism, clean minimal composition.`,
    ),
  },
  {
    id: 'page-13',
    file: 'page-13.jpg',
    prompt: S(
      `Scene: small stone steps of a house entrance. ${HEROINE} helps an elderly neighbor granny ` +
      `carry a big cardboard box up the steps, the granny turning back smiling with gratitude, ` +
      `below them a hand-drawn doodle of two separate little islands being connected by a small bridge. ` +
      `Warm helping-hand mood.`,
    ),
  },
  {
    id: 'page-14',
    file: 'page-14.jpg',
    prompt: S(
      `Scene: a grassy hilltop at sunset. ${HEROINE} and two friends stand side by side seen ` +
      `from behind at three-quarter angle, watching a big warm sun sink over soft hills, ` +
      `their long shadows joined together on the grass, a few birds in the golden sky, ` +
      `togetherness ending mood, rich warm gold and pink palette.`,
    ),
  },
];

export const GEN_CONFIG = {
  model: 'cogview-4',
  size: '1152x1536',
  endpoint: 'https://open.bigmodel.cn/api/paas/v4/images/generations',
};
