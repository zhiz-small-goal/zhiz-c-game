
import { TopicNode, DifficultyLevel, Badge } from './types';

export const POSSIBLE_BADGES: Badge[] = [
  { id: 'speed_boots', name: '风之靴', icon: '👢', description: '跑得比风还快！' },
  { id: 'wisdom_hat', name: '智慧帽', icon: '🎓', description: '聪明的象征' },
  { id: 'star_wand', name: '星星杖', icon: '🪄', description: '闪亮亮的魔法' },
  { id: 'lucky_clover', name: '幸运草', icon: '🍀', description: '好运连连' },
  { id: 'crystal_ball', name: '水晶球', icon: '🔮', description: '看透一切' },
  { id: 'dragon_egg', name: '龙蛋', icon: '🥚', description: '里面有什么呢？' },
  { id: 'magic_potion', name: '魔法药水', icon: '🧪', description: '充满能量' },
  { id: 'golden_key', name: '金钥匙', icon: '🔑', description: '通往神秘宝藏' },
];

export const INITIAL_STATS = {
  hp: 100,
  maxHp: 100,
  xp: 0,
  level: 1,
  gold: 50,
  badges: [],
};

export const XP_PER_LEVEL = 100;

export const BONUS_PERFECT = 30; // Increased for quizzes
export const BONUS_SPEED = 20;
export const SPEED_THRESHOLD_MS = 60000; // 60 Seconds

export const DIFFICULTY_SETTINGS: Record<DifficultyLevel, { 
  label: string; 
  description: string;
  xpReward: number; 
  damage: number; 
  promptMod: string; 
}> = {
  EASY: {
    label: '小小萌新 (Easy)',
    description: '就像吃蛋糕一样简单，适合第一次接触魔法的宝宝。',
    xpReward: 30,
    damage: 5, 
    promptMod: '难度：非常简单。像给8岁小朋友讲故事一样。避免专业术语，多用比喻。'
  },
  NORMAL: {
    label: '魔法学徒 (Normal)',
    description: '稍微动一点点脑筋，会有很多有趣的挑战哦。',
    xpReward: 50,
    damage: 15,
    promptMod: '难度：中等。核心概念讲解清楚，逻辑简单明了。'
  },
  HARD: {
    label: '天才少女 (Hard)',
    description: '虽然有点难，但是我相信你可以做到的！',
    xpReward: 80,
    damage: 25,
    promptMod: '难度：有一点挑战性。可以包含一些简单的代码逻辑陷阱，考验细心程度。'
  }
};

// Map structure: Learn -> Quiz ... -> EXAM (Boss)
export const TOPIC_MAP: TopicNode[] = [
  // ==========================================
  // Region 1: Plains (Basics) - 草莓语法地
  // ==========================================
  { id: 'basics_1', title: '你好世界', description: '向魔法世界问好', region: 'Plains', completed: false, locked: false, x: 1, y: 1 },
  { id: 'basics_1_quiz', title: '练习:问好', description: '巩固练习', region: 'Plains', completed: false, locked: true, x: 1, y: 1 },
  
  { id: 'basics_var', title: '神奇盒子', description: '变量与赋值', region: 'Plains', completed: false, locked: true, x: 2, y: 1 },
  { id: 'basics_var_quiz', title: '练习:盒子', description: '巩固练习', region: 'Plains', completed: false, locked: true, x: 2, y: 1 },

  { id: 'basics_type', title: '糖果分类', description: '数据类型', region: 'Plains', completed: false, locked: true, x: 3, y: 1 },
  { id: 'basics_type_quiz', title: '练习:分类', description: '巩固练习', region: 'Plains', completed: false, locked: true, x: 3, y: 1 },

  { id: 'basics_op', title: '星星加减', description: '运算符', region: 'Plains', completed: false, locked: true, x: 4, y: 1 },
  { id: 'basics_op_quiz', title: '练习:计算', description: '巩固练习', region: 'Plains', completed: false, locked: true, x: 4, y: 1 },

  { id: 'basics_io', title: '大树说话', description: '输入输出', region: 'Plains', completed: false, locked: true, x: 5, y: 1 },
  { id: 'basics_io_quiz', title: '练习:对话', description: '巩固练习', region: 'Plains', completed: false, locked: true, x: 5, y: 1 },

  { id: 'basics_math', title: '魔法算术', description: '数学库 cmath', region: 'Plains', completed: false, locked: true, x: 6, y: 1 },
  { id: 'basics_math_quiz', title: '练习:算术', description: '巩固练习', region: 'Plains', completed: false, locked: true, x: 6, y: 1 },

  // BOSS EXAM 1
  { id: 'plains_exam', title: '语法试炼', description: '第一区域总测验', region: 'Plains', completed: false, locked: true, x: 7, y: 1 },


  // ==========================================
  // Region 2: Forest (Control Flow) - 糖果循环林
  // ==========================================
  { id: 'flow_if', title: '分岔小路', description: 'If 条件', region: 'Forest', completed: false, locked: true, x: 1, y: 2 },
  { id: 'flow_if_quiz', title: '练习:抉择', description: '巩固练习', region: 'Forest', completed: false, locked: true, x: 1, y: 2 },

  { id: 'flow_switch', title: '分院帽', description: 'Switch 选择', region: 'Forest', completed: false, locked: true, x: 2, y: 2 },
  { id: 'flow_switch_quiz', title: '练习:分院', description: '巩固练习', region: 'Forest', completed: false, locked: true, x: 2, y: 2 },

  { id: 'flow_for', title: '旋转木马', description: 'For 循环', region: 'Forest', completed: false, locked: true, x: 3, y: 2 },
  { id: 'flow_for_quiz', title: '练习:旋转', description: '巩固练习', region: 'Forest', completed: false, locked: true, x: 3, y: 2 },

  { id: 'flow_while', title: '不停奔跑', description: 'While 循环', region: 'Forest', completed: false, locked: true, x: 4, y: 2 },
  { id: 'flow_while_quiz', title: '练习:奔跑', description: '巩固练习', region: 'Forest', completed: false, locked: true, x: 4, y: 2 },

  { id: 'flow_break', title: '暂停怀表', description: 'Break/Continue', region: 'Forest', completed: false, locked: true, x: 5, y: 2 },
  { id: 'flow_break_quiz', title: '练习:控制', description: '巩固练习', region: 'Forest', completed: false, locked: true, x: 5, y: 2 },

  { id: 'flow_nested', title: '星阵循环', description: '嵌套循环', region: 'Forest', completed: false, locked: true, x: 6, y: 2 },
  { id: 'flow_nested_quiz', title: '练习:星阵', description: '巩固练习', region: 'Forest', completed: false, locked: true, x: 6, y: 2 },

  // BOSS EXAM 2
  { id: 'forest_exam', title: '循环试炼', description: '第二区域总测验', region: 'Forest', completed: false, locked: true, x: 7, y: 2 },


  // ==========================================
  // Region 3: Fortress (Functions) - 云朵函数城
  // ==========================================
  { id: 'func_base', title: '小小咒语', description: '函数定义', region: 'Fortress', completed: false, locked: true, x: 1, y: 3 },
  { id: 'func_base_quiz', title: '练习:咒语', description: '巩固练习', region: 'Fortress', completed: false, locked: true, x: 1, y: 3 },

  { id: 'func_param', title: '魔力传递', description: '参数传递', region: 'Fortress', completed: false, locked: true, x: 2, y: 3 },
  { id: 'func_param_quiz', title: '练习:传递', description: '巩固练习', region: 'Fortress', completed: false, locked: true, x: 2, y: 3 },

  { id: 'func_ret', title: '带回礼物', description: '返回值', region: 'Fortress', completed: false, locked: true, x: 3, y: 3 },
  { id: 'func_ret_quiz', title: '练习:礼物', description: '巩固练习', region: 'Fortress', completed: false, locked: true, x: 3, y: 3 },

  { id: 'func_ovr', title: '百变魔法', description: '函数重载', region: 'Fortress', completed: false, locked: true, x: 4, y: 3 },
  { id: 'func_ovr_quiz', title: '练习:百变', description: '巩固练习', region: 'Fortress', completed: false, locked: true, x: 4, y: 3 },

  { id: 'func_scope', title: '秘密花园', description: '作用域', region: 'Fortress', completed: false, locked: true, x: 5, y: 3 },
  { id: 'func_scope_quiz', title: '练习:花园', description: '巩固练习', region: 'Fortress', completed: false, locked: true, x: 5, y: 3 },

  { id: 'func_rec', title: '无限镜子', description: '递归函数', region: 'Fortress', completed: false, locked: true, x: 6, y: 3 },
  { id: 'func_rec_quiz', title: '练习:镜子', description: '巩固练习', region: 'Fortress', completed: false, locked: true, x: 6, y: 3 },

  // BOSS EXAM 3
  { id: 'fortress_exam', title: '函数试炼', description: '第三区域总测验', region: 'Fortress', completed: false, locked: true, x: 7, y: 3 },


  // ==========================================
  // Region 4: Peaks (Data & Pointers) - 星星指针山
  // ==========================================
  { id: 'data_arr', title: '星星瓶子', description: '数组', region: 'Peaks', completed: false, locked: true, x: 1, y: 4 },
  { id: 'data_arr_quiz', title: '练习:瓶子', description: '巩固练习', region: 'Peaks', completed: false, locked: true, x: 1, y: 4 },

  { id: 'data_str', title: '魔法卷轴', description: '字符串', region: 'Peaks', completed: false, locked: true, x: 2, y: 4 },
  { id: 'data_str_quiz', title: '练习:卷轴', description: '巩固练习', region: 'Peaks', completed: false, locked: true, x: 2, y: 4 },

  { id: 'mem_ptr', title: '寻宝罗盘', description: '指针', region: 'Peaks', completed: false, locked: true, x: 3, y: 4 },
  { id: 'mem_ptr_quiz', title: '练习:罗盘', description: '巩固练习', region: 'Peaks', completed: false, locked: true, x: 3, y: 4 },

  { id: 'mem_ref', title: '影子朋友', description: '引用', region: 'Peaks', completed: false, locked: true, x: 4, y: 4 },
  { id: 'mem_ref_quiz', title: '练习:影子', description: '巩固练习', region: 'Peaks', completed: false, locked: true, x: 4, y: 4 },

  { id: 'mem_dyn', title: '魔法帐篷', description: '动态内存', region: 'Peaks', completed: false, locked: true, x: 5, y: 4 },
  { id: 'mem_dyn_quiz', title: '练习:帐篷', description: '巩固练习', region: 'Peaks', completed: false, locked: true, x: 5, y: 4 },

  { id: 'data_struct', title: '魔法背包', description: '结构体基础', region: 'Peaks', completed: false, locked: true, x: 6, y: 4 },
  { id: 'data_struct_quiz', title: '练习:背包', description: '巩固练习', region: 'Peaks', completed: false, locked: true, x: 6, y: 4 },

  { id: 'data_vector', title: '伸缩口袋', description: 'Vector 容器', region: 'Peaks', completed: false, locked: true, x: 7, y: 4 },
  { id: 'data_vector_quiz', title: '练习:口袋', description: '巩固练习', region: 'Peaks', completed: false, locked: true, x: 7, y: 4 },

  // BOSS EXAM 4
  { id: 'peaks_exam', title: '数据试炼', description: '第四区域总测验', region: 'Peaks', completed: false, locked: true, x: 8, y: 4 },


  // ==========================================
  // Region 5: Void (OOP) - 梦幻造物岛
  // ==========================================
  { id: 'oop_struct', title: '积木城堡', description: '结构体进阶', region: 'Void', completed: false, locked: true, x: 1, y: 5 },
  { id: 'oop_struct_quiz', title: '练习:城堡', description: '巩固练习', region: 'Void', completed: false, locked: true, x: 1, y: 5 },

  { id: 'oop_class', title: '赋予生命', description: '类', region: 'Void', completed: false, locked: true, x: 2, y: 5 },
  { id: 'oop_class_quiz', title: '练习:生命', description: '巩固练习', region: 'Void', completed: false, locked: true, x: 2, y: 5 },

  { id: 'oop_ctor', title: '诞生祝福', description: '构造函数', region: 'Void', completed: false, locked: true, x: 3, y: 5 },
  { id: 'oop_ctor_quiz', title: '练习:祝福', description: '巩固练习', region: 'Void', completed: false, locked: true, x: 3, y: 5 },

  { id: 'oop_inher', title: '家族魔法', description: '继承', region: 'Void', completed: false, locked: true, x: 4, y: 5 },
  { id: 'oop_inher_quiz', title: '练习:家族', description: '巩固练习', region: 'Void', completed: false, locked: true, x: 4, y: 5 },

  { id: 'oop_poly', title: '千变万化', description: '多态', region: 'Void', completed: false, locked: true, x: 5, y: 5 },
  { id: 'oop_poly_quiz', title: '练习:幻影', description: '巩固练习', region: 'Void', completed: false, locked: true, x: 5, y: 5 },

  { id: 'oop_static', title: '公会契约', description: 'Static 成员', region: 'Void', completed: false, locked: true, x: 6, y: 5 },
  { id: 'oop_static_quiz', title: '练习:契约', description: '巩固练习', region: 'Void', completed: false, locked: true, x: 6, y: 5 },

  // BOSS EXAM 5
  { id: 'void_exam', title: '造物主试炼', description: '第五区域总测验', region: 'Void', completed: false, locked: true, x: 7, y: 5 },
];

export const REGION_COLORS = {
  Plains: 'text-pink-500 border-pink-300 shadow-pink-200',
  Forest: 'text-teal-500 border-teal-300 shadow-teal-200',
  Fortress: 'text-sky-500 border-sky-300 shadow-sky-200',
  Peaks: 'text-violet-500 border-violet-300 shadow-violet-200',
  Void: 'text-fuchsia-500 border-fuchsia-300 shadow-fuchsia-200',
};

export const REGION_BG = {
  Plains: 'bg-gradient-to-br from-pink-50 to-rose-100',
  Forest: 'bg-gradient-to-br from-teal-50 to-emerald-100',
  Fortress: 'bg-gradient-to-br from-sky-50 to-blue-100',
  Peaks: 'bg-gradient-to-br from-violet-50 to-purple-100',
  Void: 'bg-gradient-to-br from-fuchsia-50 to-pink-100',
};
