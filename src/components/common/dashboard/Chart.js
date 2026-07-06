import React from 'react'
import { VictoryPie } from 'victory-pie'
import { VictoryTooltip } from 'victory-tooltip'

export const Chart = ({
    data
}) => {

    let infoCard = [];
    let chartData = {};
    let colors = [];
    for (let index in data) {
        const label = index.replaceAll("_", " ").replaceAll("cards", "").toUpperCase();
        chartData = {
            x: label,
            y: data[index],
        };
        infoCard.push(chartData);

        colors.push(cardColors[index.replaceAll("-", "_")]);
    }

    return (
        <>
            <VictoryPie
                data={infoCard}
                labelComponent={
                    <VictoryTooltip
                        flyoutPadding={({ text }) =>
                            text.length > 1
                                ? { top: 0, bottom: 0, left: 7, right: 7 }
                                : 7
                        }
                    />
                }
                colorScale={colors}
                animate={{
                    duration: 2000
                }}
            />
        </>
    )
}

export const cardColors = {
    monster_cards: "#CD853F",
    spell_cards: "#3CB371",
    trap_cards: "#FF1493",
    skill_cards: "#1E90FF",
    token_cards: "#696969",
    other_cards: "#8B0000",
    effect_monster_cards: "#CD853F",
    flip_effect_monster_cards: "#F4A460",
    flip_tuner_effect_monster_cards: "#A0522D",
    gemini_monster_cards: "#8B4513",
    normal_monster_cards: "#FFD700",
    normal_tuner_monster_cards: "#DAA520",
    pendulum_effect_monster_cards: "#2F4F4F",
    pendulum_flip_effect_monster_cards: "#2F4F4F",
    pendulum_normal_monster_cards: "#8FBC8F",
    pendulum_tuner_effect_monster_cards: "#006400",
    ritual_effect_monster_cards: "#1E90FF",
    ritual_monster_cards: "#00BFFF",
    skill_card_cards: "#1E90FF",
    spell_card_cards: "#3CB371",
    spirit_monster_cards: "#FFA07A",
    toon_monster_cards: "#FFE4B5",
    trap_card_cards: "#FF1493",
    tuner_monster_cards: "#00FA9A",
    union_effect_monster_cards: "#D2B48C",
    fusion_monster_cards: "#EE82EE",
    link_monster_cards: "#4682B4",
    pendulum_effect_fusion_monster_cards: "#008080",
    synchro_monster_cards: "#FFFAFA",
    synchro_pendulum_effect_monster_cards: "#FFF5EE",
    synchro_tuner_monster_cards: "#F5F5F5",
    xyz_monster_cards: "#708090",
    xyz_pendulum_effect_monster_cards: "#778899",
    token_card_cards: "#696969",
    common_cards: "#1a0000c7",
    rare_cards: "rgb(9 38 66)",
    super_rare_cards: "#FFD711",
    ultra_rare_cards: "#483D8B",
    ultimate_rare_cards: "#9932CC",
    secret_rare_cards: "#8B008B",
    prismatic_secret_rare_cards: "#BDB76B",
    ghost_rare_cards: "#006400",
    parallel_rarity_cards: "#DC143C",
    duel_terminal_cards: "#6495ED",
    gold_rare_cards: "#0FD711",
    premium_gold_rare_cards: "#DAA520",
    extra_secret_rare_cards: "#000080",
    na_cards: "#FF0000",
    dark_cards: "#800080",
    light_cards: "#fed24e",
    divine_cards: "#155909",
    earth_cards: "#8B4513",
    fire_cards: "#FF0000",
    water_cards: "#0000CD",
    wind_cards: "#3CB371",
    aqua_cards: "#87CEFA",
    beast_cards: "#DEB887",
    beast_warrior_cards: "#D2691E",
    creator_god_cards: "#8A2BE2",
    cyberse_cards: "#F0FFFF",
    dinosaur_cards: "#B8860B",
    divine_beast_cards: "#FFD700",
    dragon_cards: "#CD5C5C",
    fairy_cards: "#ADD8E6",
    fiend_cards: "#4B0082",
    fish_cards: "#ADD8E6",
    insect_cards: "#90EE90",
    machine_cards: "#D3D3D3",
    plant_cards: "#00FA9A",
    psychic_cards: "#66CDAA",
    pyro_cards: "#FF4500",
    reptile_cards: "#2E8B57",
    rock_cards: "#D2B48C",
    sea_serpent_cards: "#40E0D0",
    spellcaster_cards: "#EE82EE",
    thunder_cards: "#FFA500",
    warrior_cards: "#DB7093",
    winged_beast_cards: "#808000",
    wyrm_cards: "#008000",
    normal_cards: "#DAA520",
    field_cards: "#008000",
    equip_cards: "#0000CD",
    continuous_cards: "#800000",
    quick_play_cards: "#C71585",
    ritual_cards: "#6495ED",
    counter_cards: "#008000"
}