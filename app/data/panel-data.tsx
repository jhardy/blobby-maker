import { AmusedEyes } from "~/components/eyes/amused";
import { AngryEyes } from "~/components/eyes/angry";
import { AwwEyes } from "~/components/eyes/aww";
import { BlibbyEyes } from "~/components/eyes/blibby";
import { BloopyEyes } from "~/components/eyes/bloopy";
import { ConfusedEyes } from "~/components/eyes/confused";
import { DefaultEyes } from "~/components/eyes/default";
import { DizzyEyes } from "~/components/eyes/dizzy";
import { EyelidsDownEyes } from "~/components/eyes/eyelidsdown";
import { EyelidsUpEyes } from "~/components/eyes/eyelidsup";
import { GlassesEyes } from "~/components/eyes/glasses";
import { HeartsEyes } from "~/components/eyes/hearts";
import { JoyEyes } from "~/components/eyes/joy";
import { LashesEyes } from "~/components/eyes/lashes";
import { LinesEyes } from "~/components/eyes/lines";
import { PointyGlassesEyes } from "~/components/eyes/pointy-glasses";
import { PupilsEyes } from "~/components/eyes/pupils";
import { StarsEyes } from "~/components/eyes/stars";
import { SunglassesEyes } from "~/components/eyes/sunglasses";
import { SusEyes } from "~/components/eyes/sus";
import { WorriedEyes } from "~/components/eyes/worried";
import { XEyes } from "~/components/eyes/x";
import BallCap from "~/components/hats/ball-cap";
import Beanie from "~/components/hats/beanie";
import Beret from "~/components/hats/beret";
import BlondBob from "~/components/hats/blond-bob";
import BucketHat from "~/components/hats/bucket-hat";
import Captain from "~/components/hats/captain";
import ChefsHat from "~/components/hats/chefs-hat";
import CowboyHat from "~/components/hats/cowboy-hat";
import Crown from "~/components/hats/crown";
import HardHat from "~/components/hats/hard-hat";
import JesterHat from "~/components/hats/jester-hat";
import MoHawkHair from "~/components/hats/MohawkHari";
import PartyHat from "~/components/hats/party-hat";
import Priate from "~/components/hats/priate";
import SpikyHair from "~/components/hats/spiky-hair";
import TopHat from "~/components/hats/top-hat";
import WashingtonHair from "~/components/hats/washington-hair";
import WizardHat from "~/components/hats/wizard-hat";
import { BigSmileMouth } from "~/components/mouths/big-smile";
import { BloobyMouth } from "~/components/mouths/blooby-mouth";
import { FrownMouth } from "~/components/mouths/frown";
import { GaspMouth } from "~/components/mouths/gasp";
import { GrimaceMouth } from "~/components/mouths/grimace";
import { KissyFaceMouth } from "~/components/mouths/kissy-face";
import { Mouth } from "~/components/mouths/mouth";
import { OFaceMouth } from "~/components/mouths/o-face";
import { ScreamMouth } from "~/components/mouths/scream";
import { SmileMouth } from "~/components/mouths/smile";
import { StraightFaceMouth } from "~/components/mouths/straight-face";
import { ToungeOutMouth } from "~/components/mouths/tounge-out";
import { WFaceMouth } from "~/components/mouths/w-face";
import {
  BreezeSwatch,
  DawnSwatch,
  GoldSwatch,
  LimeSwatch,
  PurpleSwatch,
  RedSwatch,
} from "~/components/swatches/swatches";
import { EyeShadow } from "~/components/face-features/eye-shadow";
import { Freckles } from "~/components/face-features/freckles";
import { Mole } from "~/components/face-features/mole";
import { RosyCheeks } from "~/components/face-features/rosy-cheeks";
import { Stash } from "~/components/face-features/stash";
import { Tears } from "~/components/face-features/tears";

export const colorSwatches = [
  <DawnSwatch />,
  <GoldSwatch />,
  <BreezeSwatch />,
  <PurpleSwatch />,
  <LimeSwatch />,
  <RedSwatch />,
];

export const blobbySwatchNames = [
  "dawn",
  "gold",
  "breeze",
  "purple",
  "lime",
  "red",
];

export const mouthComponents = [
  <SmileMouth />,
  <Mouth />,
  <BigSmileMouth />,
  <FrownMouth />,
  <GrimaceMouth />,
  <GaspMouth />,
  <ScreamMouth />,
  <KissyFaceMouth />,
  <OFaceMouth />,
  <StraightFaceMouth />,
  <ToungeOutMouth />,
  <WFaceMouth />,
  <BloobyMouth />,
];

export const eyeComponents = [
  <DefaultEyes />,
  <JoyEyes />,
  <AwwEyes />,
  <EyelidsUpEyes />,
  <EyelidsDownEyes />,
  <AngryEyes />,
  <PupilsEyes />,
  // <AmusedEyes />,
  <ConfusedEyes />,
  <DizzyEyes />,
  // <HeartsEyes />,
  <LashesEyes />,
  // <LinesEyes />,
  // <StarsEyes />,
  <SusEyes />,
  <WorriedEyes />,
  <XEyes />,
  <BlibbyEyes />,
  <BloopyEyes />,
  <GlassesEyes />,
  <SunglassesEyes />,
  <PointyGlassesEyes />,
];

export const hatComponents = [
  <div className="empty-option"></div>,
  <BallCap />,
  <Beanie />,
  <Beret />,
  <BucketHat />,
  <Captain />,
  <ChefsHat />,
  <CowboyHat />,
  // <JesterHat />,
  // <BlondBob />,
  <HardHat />,
  <JesterHat />,
  // <MoHawkHair />,
  <Priate />,
  // <SpikyHair />,
  <TopHat />,
  // <WashingtonHair />,
  <Crown />,
  <PartyHat />,
  <WizardHat />,
];

export const faceFeatureComponents = [
  <div className="empty-option"></div>,
  <EyeShadow />,
  <Freckles />,
  <Mole />,
  <RosyCheeks />,
  <Stash />,
  <Tears />,
];
