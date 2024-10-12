<template>
	<split-page-container>
		<template #left-side>
			<div class="relative w-full h-screen overflow-x-hidden">
				<div class="absolute z-50 top-1/2">
					<arrow-back @click="onClickArrowBack" />

					<div class="ms-5 pb-5 flex flex-col">
						<h3 class="mb-5 italic">Mentions légales</h3>

						<div class="flex flex-col gap-5 whitespace-pre-line">
							<p>
								Merci de lire avec attention les différentes modalités d'utilisation du présent site avant de parcourir les pages. En naviguant sur ce site, vous
								acceptez, sans réserves, les présentes modalités.
								<br />
								<br />
								Aussi, conformément à l'article n°6 de la Loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, les responsables du présent
								site internet www.leabergougnoux.com sont :
							</p>

							<div class="flex flex-col gap-3">
								<h4 class="lowercase"><em>ÉDITEUR DU SITE</em></h4>
								<p>
									Léa BERGOUGNOUX
									<br />
									Numéro de SIRET : 843 436 692 000 27
									<br />
									Adresse : {{ mainStore.infosAddress.street }}, {{ mainStore.infosAddress.cp }} {{ mainStore.infosAddress.city }}
									<br />
									Téléphone : {{ mainStore.phoneNumber }}
									<br />
									E-mail : leabergou@gmail.com
									<br />
									Site web : www.leabergougnoux.com
								</p>
								<h4 class="lowercase"><em>DÉVELOPPEMENT</em></h4>
								<p>
									Jenny-Lee BOULANGER
									<br />
									Numéro de SIRET : 898 875 281 000 21
									<br />
									E-mail : jennblngr@gmail.com
								</p>
							</div>

							<div>
								<h4 class="mb-3 lowercase"><em>CONDITIONS D’UTILISATION</em></h4>
								<p>
									Ce site (www.leabergougnoux.com) est proposé en différents langages web (HTML, JavaScript, CSS, etc...) pour un meilleur confort d’utilisation
									et un graphisme plus agréable.
									<br />
									<br />
									Nous vous recommandons de recourir à des navigateurs modernes.
									<br />
									<br />
									Léa BERGOUGNOUX met en œuvre tous les moyens dont elle dispose, pour assurer une information fiable et une mise à jour fiable de son site
									internet.
									<br />
									<br />
									Toutefois, des erreurs ou omissions peuvent survenir. L’internaute devra donc s’assurer de l’exactitude des informations auprès de Léa
									BERGOUGNOUX, et signaler toutes modifications du site qu’il jugerait utile. Léa BERGOUGNOUX n’est en aucun cas responsable de l’utilisation
									faite de ces informations, et de tout préjudice direct ou indirect pouvant en découler.
								</p>
							</div>

							<div>
								<h4 class="mb-3 lowercase"><em>COOKIES</em></h4>
								<p>
									Le site www.leabergougnoux.com peut-être amené à vous demander l’acceptation des cookies pour des besoins de statistiques et d’affichage. Un
									cookie est une information déposée sur votre disque dur par le serveur du site que vous visitez.
									<br />
									<br />
									Il contient plusieurs données qui sont stockées sur votre ordinateur dans un simple fichier texte auquel un serveur accède pour lire et
									enregistrer des informations. Certaines parties de ce site ne peuvent être fonctionnelles sans l’acceptation de cookies.
								</p>
							</div>

							<div>
								<h4 class="mb-3 lowercase"><em>LIENS HYPERTEXTES</em></h4>
								<p>
									Les sites internet ne peuvent offrir des liens vers d’autres sites internet ou d’autres ressources disponibles sur Internet. Léa BERGOUGNOUX ne
									dispose d’aucun moyen pour contrôler les sites en connexion avec ses sites internet.
									<br />
									<br />
									Léa BERGOUGNOUX ne répond pas de la disponibilité de tels sites et sources externes, ni ne la garantit. Elle ne peut être tenue pour responsable
									de tout dommage, de quelque nature que ce soit, résultant du contenu de ces sites ou sources externes, et notamment des informations, produits
									ou services qu’ils proposent, ou de tout usage qui peut être fait de ces éléments. Les risques liés à cette utilisation incombent pleinement à
									l’internaute, qui doit se conformer à leurs conditions d’utilisation.
									<br />
									<br />
									Les utilisateurs, les abonnés et les visiteurs des sites internet ne peuvent pas mettre en place un hyperlien en direction de ce site sans
									l’autorisation expresse et préalable de Léa BERGOUGNOUX.
									<br />
									<br />
									Dans l’hypothèse où un utilisateur ou visiteur souhaiterait mettre en place un hyperlien en direction d’un des sites internet de Léa
									BERGOUGNOUX, il lui appartiendra d’adresser un email accessible sur le site afin de formuler sa demande de mise en place d’un hyperlien.
									<br />
									<br />
									Léa BERGOUGNOUX se réserve le droit d’accepter ou de refuser un hyperlien sans avoir à en justifier sa décision.
								</p>
							</div>

							<div>
								<h4 class="mb-3 lowercase"><em>SERVICES FOURNIS</em></h4>
								<p>
									L’ensemble des activités de la société ainsi que ses informations sont présentés sur notre site www.leabergougnoux.com. <br /><br />
									Léa BERGOUGNOUX s’efforce de fournir sur le site www.leabergougnoux.com des informations aussi précises que possible. Les renseignements
									figurant sur le site www.leabergougnoux.com ne sont pas exhaustifs et les photos non contractuelles.
									<br />
									<br />
									Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne. Par ailleurs, tous les informations indiquées sur
									le site www.leabergougnoux.com sont données à titre indicatif, et sont susceptibles de changer ou d’évoluer sans préavis.
								</p>
							</div>

							<div>
								<h4 class="mb-3 lowercase"><em>LIMITATION CONTRACTUELLES SUR LES DONNÉES</em></h4>
								<p>
									Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l’année, mais peut
									toutefois contenir des inexactitudes ou des omissions.
									<br />
									<br />
									Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par courriel, à l’adresse
									leabergou@gmail.com, en décrivant le problème de la manière la plus précise possible (page posant problème, type d’ordinateur et de navigateur
									utilisé, etc).
									<br />
									<br />
									Tout contenu téléchargé se fait aux risques et périls de l’utilisateur et sous sa seule responsabilité. En conséquence, ne saurait être tenu
									responsable d’un quelconque dommage subi par l’ordinateur de l’utilisateur ou d’une quelconque perte de données consécutives au téléchargement.
									<br />
									<br />
									De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de
									dernière génération mis-à-jour.
									<br />
									<br />
									Les liens hypertextes mis en place dans le cadre du présent site internet en direction d’autres ressources présentes sur le réseau Internet ne
									sauraient engager la responsabilité de Léa BERGOUGNOUX.
								</p>
							</div>

							<div>
								<h4 class="mb-3 lowercase"><em>PROPRIÉTÉ INTELLECTUELLE</em></h4>
								<p>
									Tout le contenu du présent site www.leabergougnoux.com, incluant, de façon non limitative, les graphismes, images, textes, vidéos, animations,
									sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive de la société à l’exception des marques, logos ou contenus
									appartenant à d’autres sociétés partenaires ou auteurs.
									<br />
									<br />
									Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est
									strictement interdite sans l’accord exprès par écrit de Léa BERGOUGNOUX. Cette représentation ou reproduction, par quelque procédé que ce soit,
									constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle. Le non-respect de cette
									interdiction constitue une contrefaçon pouvant engager la responsabilité civile et pénale du contrefacteur. En outre, les propriétaires des
									contenus copiés pourraient intenter une action en justice à votre encontre.
								</p>
							</div>

							<div>
								<h4 class="mb-3 lowercase"><em>LITIGES</em></h4>
								<p>
									Les présentes conditions du site www.leabergougnoux.com sont régies par les lois françaises et toute contestation ou litiges qui pourraient
									naître de l’interprétation ou de l’exécution de celles-ci seront de la compétence exclusive des tribunaux dont dépend le siège social de la
									société. La langue de référence, pour le règlement de contentieux éventuels, est le français.
								</p>
							</div>

							<div>
								<h4 class="mb-3 lowercase"><em>DONNÉES PERSONNELLES</em></h4>
								<p>
									De manière générale, vous n’êtes pas tenu de nous communiquer vos données personnelles lorsque vous visitez notre site Internet
									www.leabergougnoux.com.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</split-page-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import { useMouse } from "../composables/mouse";

import ArrowBack from "@src/components/arrow-back-component.vue";
import SplitPageContainer from "@src/components/split-page-container-component.vue";
import { useMainStore } from "../stores";

// #region Composables
useMouse();

const router = useRouter();
const mainStore = useMainStore();
// #endregion

// #region Functions
function onClickArrowBack(): void {
	router.push("/");
}
// #endregion
</script>
