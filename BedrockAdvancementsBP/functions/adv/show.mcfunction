tellraw @s {"rawtext":[{"text":"§6=== Realm Advancements ==="}]}
tellraw @s {"rawtext":[{"text":"§7Use this pack in worlds or realms. Mixed difficulties + default-inspired goals."}]}
tellraw @s {"rawtext":[{"text":"§bTotal points: "},{"score":{"name":"@s","objective":"adv_pts"}}]}

execute if score @s adv_e_log matches 1 run tellraw @s {"rawtext":[{"text":"§a[✓] Easy: Punching Trees"}]}
execute unless score @s adv_e_log matches 1 run tellraw @s {"rawtext":[{"text":"§c[ ] Easy: Punching Trees"}]}

execute if score @s adv_e_stn matches 1 run tellraw @s {"rawtext":[{"text":"§a[✓] Easy: Stone Age"}]}
execute unless score @s adv_e_stn matches 1 run tellraw @s {"rawtext":[{"text":"§c[ ] Easy: Stone Age"}]}

execute if score @s adv_e_hnt matches 1 run tellraw @s {"rawtext":[{"text":"§a[✓] Easy: Monster Hunter"}]}
execute unless score @s adv_e_hnt matches 1 run tellraw @s {"rawtext":[{"text":"§c[ ] Easy: Monster Hunter"}]}

execute if score @s adv_m_irn matches 1 run tellraw @s {"rawtext":[{"text":"§a[✓] Medium: Acquire Hardware"}]}
execute unless score @s adv_m_irn matches 1 run tellraw @s {"rawtext":[{"text":"§c[ ] Medium: Acquire Hardware"}]}

execute if score @s adv_m_sut matches 1 run tellraw @s {"rawtext":[{"text":"§a[✓] Medium: Suit Up"}]}
execute unless score @s adv_m_sut matches 1 run tellraw @s {"rawtext":[{"text":"§c[ ] Medium: Suit Up"}]}

execute if score @s adv_m_nth matches 1 run tellraw @s {"rawtext":[{"text":"§a[✓] Medium: We Need to Go Deeper"}]}
execute unless score @s adv_m_nth matches 1 run tellraw @s {"rawtext":[{"text":"§c[ ] Medium: We Need to Go Deeper"}]}

execute if score @s adv_h_dia matches 1 run tellraw @s {"rawtext":[{"text":"§a[✓] Hard: Diamonds!"}]}
execute unless score @s adv_h_dia matches 1 run tellraw @s {"rawtext":[{"text":"§c[ ] Hard: Diamonds!"}]}

execute if score @s adv_h_fir matches 1 run tellraw @s {"rawtext":[{"text":"§a[✓] Hard: Into Fire"}]}
execute unless score @s adv_h_fir matches 1 run tellraw @s {"rawtext":[{"text":"§c[ ] Hard: Into Fire"}]}

execute if score @s adv_r_str matches 1 run tellraw @s {"rawtext":[{"text":"§a[✓] Really Hard: Beaconator"}]}
execute unless score @s adv_r_str matches 1 run tellraw @s {"rawtext":[{"text":"§c[ ] Really Hard: Beaconator"}]}

execute if score @s adv_r_egg matches 1 run tellraw @s {"rawtext":[{"text":"§a[✓] Really Hard: Free the End"}]}
execute unless score @s adv_r_egg matches 1 run tellraw @s {"rawtext":[{"text":"§c[ ] Really Hard: Free the End"}]}
