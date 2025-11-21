"use client";
import { BlurFade } from "@/src/components/ui/blur-fade";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/src/components/animate-ui/components/radix/accordion";

const ITEMS = [
    {
        title: "Who Created the Periodic Table ?",
        content:
            "The modern periodic table was first created by the Russian chemist Dmitri Mendeleev in 1869. " +
            "He arranged the known elements in order of increasing atomic mass and noticed repeating patterns in their properties. " +
            "Mendeleev even left gaps for elements that had not been discovered yet and correctly predicted their properties. Later, scientists refined his work by arranging elements by atomic number, but Mendeleev is still celebrated as the “father of the periodic table.",
    },
    {
        title: "What Is the Periodic Table ?",
        content:
            "The periodic table is a chart that organizes all known chemical elements. " +
            "Elements are arranged by increasing atomic number, which is the number of protons in an atom’s nucleus. " +
            "This layout helps us quickly see patterns in properties, such as reactivity, state of matter, and metallic character.",
    },
    {
        title: "Groups, Periods, and Element Families",
        content:
            "The periodic table is divided into groups (vertical columns) and periods (horizontal rows). " +
            "Elements in the same group share similar chemical properties because they have the same number of valence electrons. " +
            "For example, Group 1 contains the highly reactive alkali metals, while Group 18 holds the noble gases, " +
            "which are mostly unreactive. Periods show trends such as changing atomic radius and ionization energy. " +
            "Understanding groups and periods makes it easier to predict how elements will behave in reactions.",
    },
    {
        title: "Why the Periodic Table Matters in Everyday Life ?",
        content:
            "The periodic table is not just for scientists in labs, it explains much of the world around us. " +
            "The metals in our phones, the oxygen we breathe, the carbon in our bodies, and the chlorine in tap water all come from elements on the table. By knowing where an element sits, chemists can predict its behavior and design useful materials, medicines, batteries, and fertilizers. Students and researchers use the periodic table as a roadmap for understanding chemical reactions, bonding, and new discoveries, making it one of the most important tools in science.",
    },
];

const RadixAccordionDemo = ({
                                multiple = false,
                                collapsible = true,
                                keepRendered = false,
                                showArrow = true,
                            }) => (
    <Accordion
        type={multiple ? "multiple" : "single"}
        collapsible={collapsible}
        className="max-w-[800px] w-full mx-auto"
    >
        {ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger showArrow={showArrow}>
                    {item.title}
                </AccordionTrigger>
                <AccordionContent keepRendered={keepRendered}>
                    {item.content}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
);
export default function TableBottomSection() {
    return (
        <section className="mt-16 px-6 py-10">
            <BlurFade>
                {/*<h2 className="text-2xl font-semibold tracking-tight">Discover the Elements</h2>*/}
                {/*<p className="mt-3 text-sm text-white/70">*/}
                {/*    Explore interactive notes, categories, and detailed properties to deepen your understanding of the periodic table.*/}
                {/*</p>*/}
                <RadixAccordionDemo />
            </BlurFade>
        </section>
    );
}