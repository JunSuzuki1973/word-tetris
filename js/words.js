/**
 * 英単語データベース
 * 難易度別に単語をグループ化
 */
const wordDatabase = {
    // 初級レベル (短い一般的な単語)
    easy: [
        { word: "apple", meaning: "りんご" },
        { word: "book", meaning: "本" },
        { word: "cat", meaning: "猫" },
        { word: "dog", meaning: "犬" },
        { word: "easy", meaning: "簡単な" },
        { word: "food", meaning: "食べ物" },
        { word: "good", meaning: "良い" },
        { word: "home", meaning: "家" },
        { word: "jump", meaning: "跳ぶ" },
        { word: "king", meaning: "王" },
        { word: "love", meaning: "愛" },
        { word: "moon", meaning: "月" },
        { word: "nice", meaning: "素敵な" },
        { word: "open", meaning: "開く" },
        { word: "play", meaning: "遊ぶ" },
        { word: "quick", meaning: "素早い" },
        { word: "rain", meaning: "雨" },
        { word: "sun", meaning: "太陽" },
        { word: "time", meaning: "時間" },
        { word: "use", meaning: "使う" },
        { word: "work", meaning: "仕事" },
        { word: "yes", meaning: "はい" },
        { word: "zoo", meaning: "動物園" },
        { word: "area", meaning: "地域" },
        { word: "back", meaning: "後ろ" },
        { word: "city", meaning: "都市" },
        { word: "dark", meaning: "暗い" },
        { word: "desk", meaning: "机" },
        { word: "east", meaning: "東" },
        { word: "fact", meaning: "事実" },
        { word: "fire", meaning: "火" },
        { word: "girl", meaning: "少女" },
        { word: "hope", meaning: "希望" },
        { word: "idea", meaning: "考え" },
        { word: "join", meaning: "参加する" },
        { word: "keep", meaning: "保つ" },
        { word: "lake", meaning: "湖" },
        { word: "mail", meaning: "郵便" },
        { word: "meet", meaning: "会う" },
        { word: "nose", meaning: "鼻" },
        { word: "only", meaning: "唯一の" },
        { word: "park", meaning: "公園" },
        { word: "read", meaning: "読む" },
        { word: "song", meaning: "歌" },
        { word: "tall", meaning: "背が高い" },
        { word: "town", meaning: "町" },
        { word: "unit", meaning: "単位" },
        { word: "very", meaning: "とても" },
        { word: "wash", meaning: "洗う" },
        { word: "year", meaning: "年" },
        // 追加の初級単語 (30問)
        { word: "air", meaning: "空気" },
        { word: "baby", meaning: "赤ちゃん" },
        { word: "ball", meaning: "ボール" },
        { word: "blue", meaning: "青" },
        { word: "box", meaning: "箱" },
        { word: "car", meaning: "車" },
        { word: "cold", meaning: "寒い" },
        { word: "day", meaning: "日" },
        { word: "door", meaning: "ドア" },
        { word: "egg", meaning: "卵" },
        { word: "eye", meaning: "目" },
        { word: "fish", meaning: "魚" },
        { word: "five", meaning: "5" },
        { word: "game", meaning: "ゲーム" },
        { word: "hand", meaning: "手" },
        { word: "hat", meaning: "帽子" },
        { word: "help", meaning: "助ける" },
        { word: "hot", meaning: "暑い" },
        { word: "key", meaning: "鍵" },
        { word: "leg", meaning: "脚" },
        { word: "map", meaning: "地図" },
        { word: "name", meaning: "名前" },
        { word: "new", meaning: "新しい" },
        { word: "old", meaning: "古い" },
        { word: "pen", meaning: "ペン" },
        { word: "red", meaning: "赤" },
        { word: "run", meaning: "走る" },
        { word: "sit", meaning: "座る" },
        { word: "tea", meaning: "お茶" },
        { word: "walk", meaning: "歩く" }
    ],
    
    // 中級レベル (やや長い単語、一般的な単語)
    medium: [
        { word: "amazing", meaning: "驚くべき" },
        { word: "beautiful", meaning: "美しい" },
        { word: "computer", meaning: "コンピュータ" },
        { word: "different", meaning: "異なる" },
        { word: "elephant", meaning: "象" },
        { word: "favorite", meaning: "お気に入り" },
        { word: "garden", meaning: "庭" },
        { word: "hospital", meaning: "病院" },
        { word: "important", meaning: "重要な" },
        { word: "journey", meaning: "旅" },
        { word: "knowledge", meaning: "知識" },
        { word: "language", meaning: "言語" },
        { word: "mountain", meaning: "山" },
        { word: "necessary", meaning: "必要な" },
        { word: "opposite", meaning: "反対の" },
        { word: "possible", meaning: "可能な" },
        { word: "question", meaning: "質問" },
        { word: "remember", meaning: "覚える" },
        { word: "student", meaning: "学生" },
        { word: "together", meaning: "一緒に" },
        // 追加の中級単語 (30問)
        { word: "adventure", meaning: "冒険" },
        { word: "birthday", meaning: "誕生日" },
        { word: "calendar", meaning: "カレンダー" },
        { word: "celebrate", meaning: "祝う" },
        { word: "challenge", meaning: "挑戦" },
        { word: "character", meaning: "性格、登場人物" },
        { word: "chocolate", meaning: "チョコレート" },
        { word: "community", meaning: "コミュニティ" },
        { word: "confident", meaning: "自信のある" },
        { word: "conversation", meaning: "会話" },
        { word: "dangerous", meaning: "危険な" },
        { word: "delicious", meaning: "美味しい" },
        { word: "education", meaning: "教育" },
        { word: "experience", meaning: "経験" },
        { word: "furniture", meaning: "家具" },
        { word: "happiness", meaning: "幸福" },
        { word: "information", meaning: "情報" },
        { word: "interview", meaning: "面接" },
        { word: "invitation", meaning: "招待" },
        { word: "medicine", meaning: "薬" },
        { word: "musician", meaning: "音楽家" },
        { word: "neighbor", meaning: "隣人" },
        { word: "ordinary", meaning: "普通の" },
        { word: "photograph", meaning: "写真" },
        { word: "practice", meaning: "練習" },
        { word: "restaurant", meaning: "レストラン" },
        { word: "situation", meaning: "状況" },
        { word: "successful", meaning: "成功した" },
        { word: "vacation", meaning: "休暇" },
        { word: "wonderful", meaning: "素晴らしい" }
    ],
    
    // 上級レベル (長い単語、専門的な単語)
    hard: [
        { word: "achievement", meaning: "達成" },
        { word: "brilliant", meaning: "素晴らしい" },
        { word: "complicated", meaning: "複雑な" },
        { word: "determination", meaning: "決意" },
        { word: "environment", meaning: "環境" },
        { word: "fascinating", meaning: "魅力的な" },
        { word: "government", meaning: "政府" },
        { word: "hypothesis", meaning: "仮説" },
        { word: "incredible", meaning: "信じられない" },
        { word: "journalism", meaning: "ジャーナリズム" },
        { word: "knowledge", meaning: "知識" },
        { word: "leadership", meaning: "リーダーシップ" },
        { word: "magnificent", meaning: "壮大な" },
        { word: "negotiation", meaning: "交渉" },
        { word: "opportunity", meaning: "機会" },
        { word: "perspective", meaning: "視点" },
        { word: "qualification", meaning: "資格" },
        { word: "relationship", meaning: "関係" },
        { word: "significant", meaning: "重要な" },
        { word: "technology", meaning: "技術" },
        // 追加の上級単語 (30問)
        { word: "accommodation", meaning: "宿泊施設" },
        { word: "accountability", meaning: "説明責任" },
        { word: "advertisement", meaning: "広告" },
        { word: "appreciation", meaning: "感謝" },
        { word: "authorization", meaning: "承認" },
        { word: "biodiversity", meaning: "生物多様性" },
        { word: "collaboration", meaning: "協力" },
        { word: "comprehensive", meaning: "包括的な" },
        { word: "confidentiality", meaning: "機密性" },
        { word: "controversial", meaning: "物議を醸す" },
        { word: "demonstration", meaning: "実証" },
        { word: "disappointment", meaning: "失望" },
        { word: "entrepreneurship", meaning: "起業家精神" },
        { word: "extraordinary", meaning: "並外れた" },
        { word: "fundamentally", meaning: "根本的に" },
        { word: "globalization", meaning: "グローバル化" },
        { word: "implementation", meaning: "実装" },
        { word: "infrastructure", meaning: "インフラ" },
        { word: "interpretation", meaning: "解釈" },
        { word: "manufacturing", meaning: "製造" },
        { word: "miscellaneous", meaning: "様々な" },
        { word: "nevertheless", meaning: "それにもかかわらず" },
        { word: "overwhelming", meaning: "圧倒的な" },
        { word: "philosophical", meaning: "哲学的な" },
        { word: "revolutionary", meaning: "革命的な" },
        { word: "sophisticated", meaning: "洗練された" },
        { word: "sustainability", meaning: "持続可能性" },
        { word: "transformation", meaning: "変革" },
        { word: "unpredictable", meaning: "予測不可能な" },
        { word: "vulnerability", meaning: "脆弱性" }
    ]
};

/**
 * 指定された難易度の単語をランダムに取得する
 * @param {string} difficulty - 難易度 ('easy', 'medium', 'hard')
 * @returns {Object} 単語オブジェクト
 */
function getRandomWord(difficulty) {
    const wordList = wordDatabase[difficulty] || wordDatabase.easy;
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

/**
 * 現在のレベルに基づいて難易度を決定する
 * @param {number} level - 現在のゲームレベル
 * @returns {string} 難易度 ('easy', 'medium', 'hard')
 */
function getDifficultyByLevel(level) {
    if (level < 5) {
        return 'easy';
    } else if (level < 10) {
        return 'medium';
    } else {
        return 'hard';
    }
}