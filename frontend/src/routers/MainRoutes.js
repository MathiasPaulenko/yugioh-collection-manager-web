import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { Navbar } from '../components/common/Navbar';
import { CardScreen } from '../components/screens/CardScreen';

import { CollectionsScreen } from '../components/screens/CollectionsScreen'
import { AddCardScreen } from '../components/screens/AddCard/AddCardScreen';
import { FiltersScreen } from '../components/screens/FiltersScreen';
import { NormalAddCardScreen } from '../components/screens/AddCard/NormalAddCardScreen';
import { FusionAddCardScreen } from '../components/screens/AddCard/FusionAddCardScreen';
import { SynchroAddCardScreen } from '../components/screens/AddCard/SynchroAddCardScreen';
import { XYZAddCardScreen } from '../components/screens/AddCard/XYZAddCardScreen';
import { LinkAddCardScreen } from '../components/screens/AddCard/LinkAddCardScreen';
import { TrapAddCardScreen } from '../components/screens/AddCard/TrapAddCardScreen';
import { SpellAddCardScreen } from '../components/screens/AddCard/SpellAddCardScreen';
import { TokenAddCardScreen } from '../components/screens/AddCard/TokenAddCardScreen';
import { SkillAddCardScreen } from '../components/screens/AddCard/SkillAddCardScreen';
import { RitualAddCardScreen } from '../components/screens/AddCard/RitualAddCardScreen';
import { PendulumAddCardScreen } from '../components/screens/AddCard/PendulumAddCardScreen';
import { UpdateCard } from '../components/screens/UpdateCard';
import { Dashboard } from '../components/screens/Dashboard';
import { Repeated } from '../components/screens/Repeated';
import { PricesScreen } from '../components/screens/PricesScreen';
import { Footer } from '../components/common/Footer';
import { CardSetScreen } from '../components/screens/CardSetScreen';
import ScrollTopArrow from '../components/common/ScrollTopArrow';
import { BanlistScreen } from '../components/screens/BanlistScreen';
import { StapleScreen } from '../components/screens/StapleScreen';
import { CardSetListscreen } from '../components/screens/CardSetListscreen';
import { SearchCardScreen } from '../components/screens/SearchCardScreen';
import { ArchetypesListScreen } from '../components/screens/ArchetypesListScreen';

export const MainRoutes = () => {

    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>

                    <Route path="/" element={<CollectionsScreen />} />
                    <Route path="/collections" element={<CollectionsScreen />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/filters" element={<FiltersScreen />} />
                    <Route path="card/:serial_code" element={<CardScreen />} />
                    <Route path="card/update/:serial_code" element={<UpdateCard />} />
                    <Route path="/repeated" element={<Repeated />} />
                    <Route path="/prices" element={<PricesScreen />} />
                    <Route path="/cardset" element={<CardSetScreen />} />

                    <Route path="/banlist" element={<BanlistScreen />} />
                    <Route path="/staples" element={<StapleScreen />} />
                    <Route path="/cardsetlist" element={<CardSetListscreen />} />
                    <Route path="/search_card" element={<SearchCardScreen />} />
                    <Route path="/archetypes_list" element={<ArchetypesListScreen />} />

                    <Route path="/add" element={<AddCardScreen />} />
                    <Route path="/add/normal" element={<NormalAddCardScreen />} />
                    <Route path="/add/fusion" element={<FusionAddCardScreen />} />
                    <Route path="/add/synchro" element={<SynchroAddCardScreen />} />
                    <Route path="/add/xyz" element={<XYZAddCardScreen />} />
                    <Route path="/add/link" element={<LinkAddCardScreen />} />
                    <Route path="/add/trap" element={<TrapAddCardScreen />} />
                    <Route path="/add/spell" element={<SpellAddCardScreen />} />
                    <Route path="/add/skill" element={<SkillAddCardScreen />} />
                    <Route path="/add/token" element={<TokenAddCardScreen />} />
                    <Route path="/add/pendulum" element={<PendulumAddCardScreen />} />
                    <Route path="/add/ritual" element={<RitualAddCardScreen />} />

                </Routes>
            </div>

            <ScrollTopArrow />

            <Footer />
        </>
    )
}
