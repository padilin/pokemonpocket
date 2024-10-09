import { Link } from "@remix-run/react";
import { Image } from "~/components/Image";
import { Card } from "~/db/payload-custom-types";
import { EntryCardData } from "../$entryId";
import { H3 } from "~/components/Headers";

export function CardsRelated({ data }: EntryCardData) {
   const relatedCards = data.card.pokemon?.pokemonSets;

   return (
      <div>
         {relatedCards &&
            relatedCards.map((set) => (
               <div key={set.name}>
                  <H3>
                     <div className="flex items-center justify-between">
                        <div className="">{set?.name}</div>
                        <Image
                           className="h-7 object-contain"
                           height={80}
                           url={set.set?.logo?.url}
                        />
                     </div>
                  </H3>
                  <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
                     {set.cards &&
                        set.cards.map((card) => (
                           <Link
                              className="block border border-color-sub rounded-md relative p-2 shadow-sm shadow-1"
                              to={`/c/cards/${card.slug}`}
                           >
                              <div className="text-sm font-bold pb-1 sr-only">
                                 {card.name}
                              </div>
                              <Image
                                 className="object-contain"
                                 width={400}
                                 url={
                                    card.image?.url ??
                                    "https://static.mana.wiki/tcgwiki-pokemonpocket/Card_Back.png"
                                 }
                              />
                              <div className="flex items-center gap-2 justify-between pt-1.5">
                                 <Image
                                    className="object-contain h-5"
                                    height={24}
                                    url={card.rarity?.icon?.url}
                                 />
                                 {card.pokemonType?.icon?.url ? (
                                    <Image
                                       className="size-4 object-contain"
                                       width={40}
                                       height={40}
                                       url={card.pokemonType?.icon?.url}
                                    />
                                 ) : undefined}
                              </div>
                           </Link>
                        ))}
                  </div>
               </div>
            ))}
      </div>
   );
}