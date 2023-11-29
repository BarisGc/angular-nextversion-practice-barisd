// purpose:
// 1) An interface is a way to define a contract on a function with respect to the arguments and their type. Along with functions, an interface can also be used with a Class as well to define custom types.
// 2)
// The Interface describes either a contract for a class or a new type. It is a pure Typescript element, so it doesn't affect Javascript.

// TODO: convert into generic kinda <string|null >
export interface EBook {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: string;
    ratingsCount: string;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}
// export declare interface ModuleWithProviders<T> {
//   ngModule: Type<T>;
//   providers?: Provider[];
// }

export function generateInitialEBook(): EBook {
  return {
    id: '',
    volumeInfo: {
      title: '',
      subtitle: '',
      authors: [],
      publisher: '',
      publishDate: '',
      description: '',
      averageRating: '',
      ratingsCount: '',
      imageLinks: {
        thumbnail: '',
        smallThumbnail: '',
      },
    },
  };
}
