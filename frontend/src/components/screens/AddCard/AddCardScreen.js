import React from 'react';
import { Title } from "../../common/Title";
import "../../../statics/css/main.css"
import { TypeCard } from "../../common/add/TypeCard";
import { ReturnButton } from "../../common/ReturnButton";



export const AddCardScreen = () => {


    return (
        <>

            <div className='row mt-3 align-items-center mb-3'>
                <div className='col-sm-8'>
                    <Title value='Add New Card' />
                </div>
                <div className="col-sm-4">
                    <ReturnButton value="Return" />
                </div>
            </div>
            <hr />

            <div className="row mt-2 align-items-center text-center">
                <TypeCard background_image='normal.jpg' card_image='Effect Monster' type='Normal/Effect Monster Card' page='normal' />
                <TypeCard background_image='fusion.png' card_image='Fusion Monster' type='Fusion Monster Card' page='fusion' />
                <TypeCard background_image='sincro.jpg' card_image='Synchro Monster' type='Synchro Monster Card' page='synchro' />
                <TypeCard background_image='xyz.jpg' card_image='XYZ Monster' type='XYZ Monster Card' page='xyz' />
                <TypeCard background_image='link.png' card_image='Link Monster' type='Link Monster Card' page='link' />
                <TypeCard background_image='trap.png' card_image='Trap Card' type='Trap Card' page='trap' />
                <TypeCard background_image='spell.jpg' card_image='Spell Card' type='Spell Card' page='spell' />
                <TypeCard background_image='skill.jpg' card_image='Skill Card' type='Skill Card' page='skill' />
                <TypeCard background_image='token.jpg' card_image='Token Card' type='Token Card' page='token' />
                <TypeCard background_image='ritual.jpg' card_image='Ritual Monster' type='Ritual Monster Card' page='ritual' />
                <TypeCard background_image='pendulum.jpg' card_image='Pendulum Monster' type='Pendulum Monster Card' page='pendulum' />
            </div>

        </>
    )
}
