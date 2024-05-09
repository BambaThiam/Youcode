import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Définit une fonction asynchrone nommée `getCourses` qui peut récupérer des cours, éventuellement filtrés pour un utilisateur spécifique.
export const getCourses = async (userId?: string) => {
  // Utilise l'ORM Prisma pour interroger la table `course` dans la base de données.
  return await prisma.course.findMany({
    where: userId
      // Si un `userId` est fourni, applique un filtre à la requête pour retourner uniquement les cours liés à cet utilisateur.
      ? {
          users: {
            some: {
              userId,
            },
          },
        }
      // Si aucun `userId` n'est fourni, n'applique aucun filtre (undefined).
      : undefined,
    // Sélectionne des champs spécifiques des enregistrements de cours à inclure dans la réponse.
    select: {
      name: true,           // Inclut le nom du cours.
      image: true,          // Inclut l'image du cours.
      presentation: true,   // Inclut les détails de la présentation du cours.
      id: true,             // Inclut l'identifiant du cours.
      creator: {            // Inclut des informations sur le créateur du cours.
        select: {
          image: true,      // Inclut l'image du créateur.
          name: true,       // Inclut le nom du créateur.
        },
      },
    },
  });
};

// Définit un type `CoursesCard`, qui est un élément du tableau retourné par la promesse `getCourses`. Retourne le même type tout simplement (hover pour voir)
export type CoursesCard = Prisma.PromiseReturnType<typeof getCourses>[number];