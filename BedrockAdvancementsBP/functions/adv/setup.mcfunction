scoreboard objectives add adv_pts dummy
scoreboard objectives add adv_e_log dummy
scoreboard objectives add adv_e_stn dummy
scoreboard objectives add adv_e_hnt dummy
scoreboard objectives add adv_m_irn dummy
scoreboard objectives add adv_m_sut dummy
scoreboard objectives add adv_m_nth dummy
scoreboard objectives add adv_h_dia dummy
scoreboard objectives add adv_h_fir dummy
scoreboard objectives add adv_r_str dummy
scoreboard objectives add adv_r_egg dummy

scoreboard players add @a adv_pts 0
scoreboard players add @a adv_e_log 0
scoreboard players add @a adv_e_stn 0
scoreboard players add @a adv_e_hnt 0
scoreboard players add @a adv_m_irn 0
scoreboard players add @a adv_m_sut 0
scoreboard players add @a adv_m_nth 0
scoreboard players add @a adv_h_dia 0
scoreboard players add @a adv_h_fir 0
scoreboard players add @a adv_r_str 0
scoreboard players add @a adv_r_egg 0

tellraw @a {"rawtext":[{"text":"§a[Advancements] Loaded. Run §e/function adv/show §ato view your progress."}]}

function stats/setup
